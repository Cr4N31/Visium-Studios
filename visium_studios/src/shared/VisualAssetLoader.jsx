import { useEffect, useState } from "react";

function VisualAssetLoader() {
  const [overlays, setOverlays] = useState([]);

  useEffect(() => {
    const assets = new Map();
    let frameId = 0;
    let nextAssetId = 0;
    const inViewport = (element) => {
      const bounds = element.getBoundingClientRect();
      return bounds.bottom > 0 && bounds.top < window.innerHeight;
    };

    const updateProgress = () => {
      assets.forEach((asset, element) => {
        if (!element.isConnected) {
          observer?.unobserve(element);
          resizeObserver?.unobserve(element);
          assets.delete(element);
        } else if (inViewport(element)) {
          asset.active = true;
        }
        asset.loaded ||= isLoaded(element) || Boolean(element.error);
      });

      const visibleAssets = [...assets.entries()].filter(
        ([element, asset]) => asset.active && inViewport(element),
      );
      if (!visibleAssets.length) {
        setOverlays([]);
        return;
      }

      const loaded = visibleAssets.filter(([, asset]) => asset.loaded).length;
      const progress =
        loaded === visibleAssets.length
          ? 100
          : Math.max(1, Math.floor((loaded / visibleAssets.length) * 100));

      setOverlays(
        visibleAssets
          .filter(([, asset]) => !asset.loaded)
          .map(([element, asset]) => {
            const { top, left, width, height } = element.getBoundingClientRect();
            return {
              id: asset.id,
              top,
              left,
              width,
              height,
              progress,
            };
          })
          .filter((overlay) => overlay.width > 0 && overlay.height > 0),
      );
    };

    const scheduleUpdate = () => {
      if (frameId) return;
      frameId = window.requestAnimationFrame(() => {
        frameId = 0;
        updateProgress();
      });
    };

    const isLoaded = (element) =>
      element instanceof HTMLImageElement
        ? element.complete
        : element.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA;

    const observeAsset = (element) => {
      if (assets.has(element)) return;
      assets.set(element, {
        id: nextAssetId++,
        active: inViewport(element),
        loaded: isLoaded(element) || Boolean(element.error),
      });
      observer?.observe(element);
      resizeObserver?.observe(element);
    };

    const scan = (root) => {
      if (root instanceof Element && root.matches("img, video")) {
        observeAsset(root);
      }
      root.querySelectorAll?.("img, video").forEach(observeAsset);
      updateProgress();
    };

    const observer =
      "IntersectionObserver" in window
        ? new IntersectionObserver((entries) => {
            entries.forEach(({ target, isIntersecting }) => {
              if (!isIntersecting) return;
              const asset = assets.get(target);
              if (asset) asset.active = true;
            });
            updateProgress();
          })
        : null;

    const resizeObserver =
      "ResizeObserver" in window
        ? new ResizeObserver(scheduleUpdate)
        : null;

    const handleAssetEvent = (event) => {
      const asset = assets.get(event.target);
      if (!asset) return;
      asset.loaded = true;
      updateProgress();
    };

    const mutationObserver = new MutationObserver((records) => {
      records.forEach((record) =>
        record.addedNodes.forEach((node) => {
          if (node instanceof Element) scan(node);
        }),
      );
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });
    document.addEventListener("load", handleAssetEvent, true);
    document.addEventListener("loadeddata", handleAssetEvent, true);
    document.addEventListener("error", handleAssetEvent, true);
    document.addEventListener("scroll", scheduleUpdate, true);
    window.addEventListener("resize", scheduleUpdate);
    scan(document);

    return () => {
      if (frameId) window.cancelAnimationFrame(frameId);
      observer?.disconnect();
      resizeObserver?.disconnect();
      mutationObserver.disconnect();
      document.removeEventListener("load", handleAssetEvent, true);
      document.removeEventListener("loadeddata", handleAssetEvent, true);
      document.removeEventListener("error", handleAssetEvent, true);
      document.removeEventListener("scroll", scheduleUpdate, true);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, []);

  return (
    <>
      {overlays.map(({ id, top, left, width, height, progress }) => (
        <div
          key={id}
          className="pointer-events-none fixed z-[190] flex items-center justify-center overflow-hidden bg-[#0B0B0B] text-white"
          style={{ top, left, width, height }}
          role="status"
          aria-live="polite"
          aria-label={`Loading visual asset: ${progress}%`}
        >
          <span className="font-mono text-sm">{progress}%</span>
        </div>
      ))}
    </>
  );
}

export default VisualAssetLoader;

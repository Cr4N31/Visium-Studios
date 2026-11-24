import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

const LOADER_DURATION = 450;

function VisualAssetLoader() {
  const [overlays, setOverlays] = useState([]);

  useEffect(() => {
    const assets = new Map();
    const positionedParents = new Map();
    let frameId = 0;
    let nextAssetId = 0;

    const inViewport = (element) => {
      const bounds = element.getBoundingClientRect();
      return bounds.bottom > 0 && bounds.top < window.innerHeight;
    };

    const ensureStarted = (asset) => {
      if (asset.startedAt) return;
      asset.startedAt = performance.now();
    };

    const assetProgress = (asset) => {
      if (asset.loaded) return 100;
      if (!asset.startedAt) return 1;
      return Math.min(
        100,
        Math.max(1, Math.floor(((performance.now() - asset.startedAt) / LOADER_DURATION) * 100)),
      );
    };

    const updateProgress = () => {
      assets.forEach((asset, element) => {
        if (!element.isConnected) {
          observer?.unobserve(element);
          resizeObserver?.unobserve(element);
          assets.delete(element);
          return;
        }

        if (inViewport(element)) {
          asset.active = true;
          ensureStarted(asset);
        }

        if (!asset.loaded && asset.startedAt && performance.now() - asset.startedAt >= LOADER_DURATION) {
          asset.loaded = true;
        }
      });

      const visibleAssets = [...assets.entries()].filter(
        ([element, asset]) => asset.active && inViewport(element),
      );
      if (!visibleAssets.length) {
        setOverlays([]);
        return;
      }

      const nextOverlays = visibleAssets
        .map(([element, asset]) => {
          const progress = assetProgress(asset);
          if (progress >= 100) {
            asset.loaded = true;
            return null;
          }

          const parent = element.parentElement;
          if (!parent) return null;

          if (
            !positionedParents.has(parent) &&
            window.getComputedStyle(parent).position === "static"
          ) {
            positionedParents.set(parent, parent.style.position);
            parent.style.position = "relative";
          }

          return {
            id: asset.id,
            parent,
            top: element.offsetTop,
            left: element.offsetLeft,
            width: element.offsetWidth,
            height: element.offsetHeight,
            radius: window.getComputedStyle(element).borderRadius,
            progress,
          };
        })
        .filter((overlay) => overlay && overlay.width > 0 && overlay.height > 0);

      const activeParents = new Set(nextOverlays.map((overlay) => overlay.parent));
      positionedParents.forEach((originalPosition, parent) => {
        if (activeParents.has(parent)) return;
        parent.style.position = originalPosition;
        positionedParents.delete(parent);
      });

      setOverlays(nextOverlays);

      const hasPending = [...assets.values()].some(
        (asset) => asset.active && !asset.loaded,
      );
      if (hasPending) {
        scheduleUpdate();
      }
    };

    const scheduleUpdate = () => {
      if (frameId) return;
      frameId = window.requestAnimationFrame(() => {
        frameId = 0;
        updateProgress();
      });
    };

    const observeAsset = (element) => {
      if (assets.has(element)) return;
      const active = inViewport(element);
      assets.set(element, {
        id: nextAssetId++,
        active,
        loaded: false,
        startedAt: active ? performance.now() : 0,
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
              if (!asset) return;
              asset.active = true;
              ensureStarted(asset);
            });
            updateProgress();
          })
        : null;

    const resizeObserver =
      "ResizeObserver" in window ? new ResizeObserver(scheduleUpdate) : null;

    const mutationObserver = new MutationObserver((records) => {
      records.forEach((record) =>
        record.addedNodes.forEach((node) => {
          if (node instanceof Element) scan(node);
        }),
      );
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });
    document.addEventListener("scroll", scheduleUpdate, true);
    window.addEventListener("resize", scheduleUpdate);
    scan(document);

    return () => {
      if (frameId) window.cancelAnimationFrame(frameId);
      observer?.disconnect();
      resizeObserver?.disconnect();
      mutationObserver.disconnect();
      positionedParents.forEach((originalPosition, parent) => {
        parent.style.position = originalPosition;
      });
      document.removeEventListener("scroll", scheduleUpdate, true);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, []);

  return (
    <>
      {overlays.map(
        ({ id, parent, top, left, width, height, radius, progress }) =>
          createPortal(
            <div
              className="pointer-events-none absolute z-[190] flex items-center justify-center overflow-hidden bg-[#0B0B0B] text-white"
              style={{ top, left, width, height, borderRadius: radius }}
              role="status"
              aria-live="polite"
              aria-label={`Loading visual asset: ${progress}%`}
            >
              <span className="font-mono text-sm">{progress}%</span>
            </div>,
            parent,
            String(id),
          ),
      )}
    </>
  );
}

export default VisualAssetLoader;

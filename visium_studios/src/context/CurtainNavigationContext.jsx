// src/context/CurtainNavigationContext.jsx

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
} from "react";

import { useNavigate, useLocation } from "react-router-dom";

import Loader from "../shared/Loader";

const CurtainNavigationContext = createContext(null);

const INITIAL_LOAD_DELAY = 1100;

export function CurtainNavigationProvider({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [visible, setVisible] = useState(true);

  const pendingPath = useRef(null);
  const pendingCallback = useRef(null);

  // Tracks navigation that was already initiated through
  // navigateWithCurtain so the pathname watcher doesn't
  // trigger the curtain a second time.
  const curtainNavigation = useRef(false);

  // Prevents the initial render from triggering a transition.
  const initialRender = useRef(true);

  /*
   * Initial page-load curtain
   */
  useEffect(() => {
    const timer = window.setTimeout(() => {
      setVisible(false);
      initialRender.current = false;
    }, INITIAL_LOAD_DELAY);

    return () => window.clearTimeout(timer);
  }, []);

  /*
   * Global route-change detection.
   *
   * This catches:
   *
   * <Link to="/contact" />
   * <Link to="/work" />
   * navigate("/studio")
   * footer links
   * CTA links
   * project links
   *
   * Anything that changes the React Router pathname
   * gets the curtain automatically.
   */
  useEffect(() => {
    if (initialRender.current) return;

    // Navigation already came through navigateWithCurtain().
    // The curtain is already visible, so don't trigger it again.
    if (curtainNavigation.current) {
      curtainNavigation.current = false;
      return;
    }

    // Direct React Router navigation.
    setVisible(true);

    const timer = window.setTimeout(() => {
      setVisible(false);
    }, 700);

    return () => window.clearTimeout(timer);
  }, [location.pathname]);

  /*
   * Explicit curtain navigation.
   *
   * Keep this for places where you need the existing
   * controlled navigation behavior or an onNavigated callback.
   */
  const navigateWithCurtain = useCallback(
    (path, { onNavigated } = {}) => {
      if (visible) return;

      // Same-page navigation doesn't need a curtain.
      if (path === location.pathname) {
        onNavigated?.();
        return;
      }

      pendingPath.current = path;
      pendingCallback.current = onNavigated ?? null;

      curtainNavigation.current = true;

      setVisible(true);
    },
    [visible, location.pathname],
  );

  /*
   * Called by Loader when the curtain has completely
   * covered the screen.
   */
  const handleCoverComplete = useCallback(() => {
    if (pendingPath.current) {
      navigate(pendingPath.current);

      pendingPath.current = null;
    }

    /*
     * Fires while the new route is covered.
     * Useful for hash scrolling or other DOM-dependent
     * actions.
     */
    pendingCallback.current?.();
    pendingCallback.current = null;

    /*
     * For explicit curtain navigation, don't immediately
     * hide here if the pathname change is about to happen.
     *
     * The route-change effect will handle the final reveal.
     */
    if (!pendingPath.current) {
      setVisible(false);
    }
  }, [navigate]);

  return (
    <CurtainNavigationContext.Provider value={navigateWithCurtain}>
      {children}

      <Loader visible={visible} onCoverComplete={handleCoverComplete} />
    </CurtainNavigationContext.Provider>
  );
}

export function useCurtainNavigate() {
  const context = useContext(CurtainNavigationContext);

  if (!context) {
    throw new Error(
      "useCurtainNavigate must be used inside a CurtainNavigationProvider",
    );
  }

  return context;
}

// src/context/CurtainNavigationContext.jsx
import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../shared/Loader";

const CurtainNavigationContext = createContext(null);

const INITIAL_LOAD_DELAY = 1100;

export function CurtainNavigationProvider({ children }) {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(true);
  const pendingPath = useRef(null);
  const pendingCallback = useRef(null);

  useEffect(() => {
    const timer = window.setTimeout(
      () => setVisible(false),
      INITIAL_LOAD_DELAY,
    );
    return () => window.clearTimeout(timer);
  }, []);

  const navigateWithCurtain = useCallback(
    (path, { onNavigated } = {}) => {
      if (visible) return;
      pendingPath.current = path;
      pendingCallback.current = onNavigated ?? null;
      setVisible(true);
    },
    [visible],
  );

  const handleCoverComplete = useCallback(() => {
    if (pendingPath.current) {
      navigate(pendingPath.current);
      pendingPath.current = null;
    }
    // Fires after the route has swapped, but while still covered — this is
    // the safe moment for anything (like a hash scroll) that needs the new
    // page's DOM to exist before it runs.
    pendingCallback.current?.();
    pendingCallback.current = null;
    setVisible(false);
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

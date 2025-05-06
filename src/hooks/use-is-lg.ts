import { useEffect, useState } from "react";

export function useIsLG() {
  const [isLG, setIsLG] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => setIsLG(window.innerWidth >= 1024);
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return isLG;
}

"use client";

import { useEffect } from "react";
import Lenis from "lenis";

const LenisWrapper = ({ children }) => {
  useEffect(() => {
    const lenis = new Lenis({
      smooth: true,
      smoothTouch: true,
      direction: "vertical",
    });

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return <>{children}</>;
};

export default LenisWrapper;

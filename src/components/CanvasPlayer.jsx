"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  preloadImages,
  resizeCanvas,
  renderFrame,
} from "@/utils/canvasPlayerHelper";

gsap.registerPlugin(ScrollTrigger);

const setupScrollTrigger = (container, canvas, images) => {
  ScrollTrigger.create({
    trigger: container,
    start: "top top",
    end: "bottom+=200% top",
    pin: true,
    scrub: 1,
    onUpdate: (self) => renderFrame(canvas, images, self.progress),
  });
};

const CanvasPlayer = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [images, setImages] = useState([]);

  // ----- preload images -----
  useEffect(() => {
    const loadImages = async () => {
      const preloadedImages = await preloadImages();
      setImages(preloadedImages);
    };

    loadImages();
  }, []);

  // -------- canvas resizing --------
  useEffect(() => {
    const handleResize = () =>
      resizeCanvas(canvasRef.current, containerRef.current);

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useGSAP(() => {
    if (images.length)
      setupScrollTrigger(containerRef.current, canvasRef.current, images);
  }, [images]);

  return (
    <div
      ref={containerRef}
      className="h-[100dvh] bg-black grid place-content-center"
    >
      <canvas ref={canvasRef} className="block mx-auto w-full max-h-full" />
    </div>
  );
};

export default CanvasPlayer;

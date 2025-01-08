"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function VideoComp() {
  const videoRef = useRef(null); // Ref for the video element
  const containerRef = useRef(null); // Ref for the scroll container

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    const src = video.currentSrc || video.src;

    // Function to add an event listener that removes itself after being triggered
    const once = (el, event, fn, opts) => {
      const onceFn = function (e) {
        el.removeEventListener(event, onceFn);
        fn.apply(this, arguments);
      };
      el.addEventListener(event, onceFn, opts);
      return onceFn;
    };

    // iOS-specific activation
    once(document.documentElement, "touchstart", () => {
      video.play();
      video.pause();
    });

    // GSAP ScrollTrigger for syncing video playback with scrolling
    const tl = gsap.timeline({
      defaults: { duration: 1 },
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });

    const handleLoadedMetadata = () => {
      tl.fromTo(
        video,
        { currentTime: 0 },
        { currentTime: video.duration || 1 }
      );
    };

    // Listen for the `loadedmetadata` event on the video
    video.addEventListener("loadedmetadata", handleLoadedMetadata);

    // Fetch video as a blob (optional for performance optimization)
    const fetchVideoBlob = () => {
      if (window.fetch) {
        fetch(src)
          .then((response) => response.blob())
          .then((blob) => {
            const blobURL = URL.createObjectURL(blob);
            const t = video.currentTime;

            once(document.documentElement, "touchstart", () => {
              video.play();
              video.pause();
            });

            video.setAttribute("src", blobURL);
            video.currentTime = t + 0.01;
          });
      }
    };

    const timeoutId = setTimeout(fetchVideoBlob, 1000);

    // Cleanup function
    return () => {
      clearTimeout(timeoutId);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      if (tl) tl.kill();
      if (ScrollTrigger) ScrollTrigger.killAll();
    };
  }, []);

  return (
    <>
      <video
        ref={videoRef}
        src="https://www.apple.com/105/media/us/iphone/family/2024/cf19f185-dd7e-4350-97ff-e44860713b54/anim/welcome/xlarge_2x.mp4"
        playsInline
        webkitplaysinline="true"
        preload="auto"
        muted
        className="video-background"
      ></video>
      <div ref={containerRef} id="container" style={{ height: "200vh" }}></div>
    </>
  );
}

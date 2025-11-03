"use client";

import { useState, useRef, useEffect } from "react";

export function ImageComparisonSlider() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = (x / rect.width) * 100;

    setSliderPosition(Math.min(Math.max(percentage, 0), 100));
  };

  const handleMouseDown = () => setIsDragging(true);

  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("touchmove", handleTouchMove);
    document.addEventListener("touchend", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <section className="py-24 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
            See the <span className="text-primary">Difference</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Drag the slider to reveal the authentic image beneath the deepfake.
            Our AI detection technology identifies even the most sophisticated
            manipulations.
          </p>
        </div>

        <div
          ref={containerRef}
          className="relative w-full aspect-video rounded-lg overflow-hidden cursor-ew-resize select-none shadow-2xl border border-border/50"
          onMouseDown={handleMouseDown}
          onTouchStart={handleMouseDown}
        >
          {/* Real Image (underneath) */}
          <div className="absolute inset-0">
            <img
              src="/elon.png"
              alt="Real Image"
              className="w-full h-full object-cover"
              draggable={false}
            />
            <div className="absolute top-4 left-4 bg-primary/90 text-primary-foreground px-3 py-1.5 rounded-md text-sm font-semibold backdrop-blur-sm">
              Real Image
            </div>
          </div>

          {/* Deepfake Image (on top, clipped) */}
          <div
            className="absolute inset-0 transition-none"
            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
          >
            <img
              src="/fake-elon.png"
              alt="Deepfake Image"
              className="w-full h-full object-cover"
              draggable={false}
            />
            <div className="absolute top-4 right-4 bg-destructive/90 text-destructive-foreground px-3 py-1.5 rounded-md text-sm font-semibold backdrop-blur-sm">
              Deepfake Detected
            </div>
          </div>

          {/* Slider Handle */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-primary shadow-lg transition-none"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-primary rounded-full shadow-xl flex items-center justify-center border-4 border-background">
              <div className="flex gap-1">
                <div className="w-0.5 h-4 bg-primary-foreground rounded-full"></div>
                <div className="w-0.5 h-4 bg-primary-foreground rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            <span className="inline-block mr-2">←</span>
            Drag the slider to compare
            <span className="inline-block ml-2">→</span>
          </p>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Box, ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

export function ProductImageGallery({
  images,
  productName,
}: ProductImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const prev = useCallback(() => {
    setSelectedIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  }, [images.length]);

  const next = useCallback(() => {
    setSelectedIndex((i) => (i === images.length - 1 ? 0 : i + 1));
  }, [images.length]);

  // Keyboard navigation inside lightbox
  useEffect(() => {
    if (!lightboxOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxOpen, prev, next]);

  // ── Empty state ──────────────────────────────────────────────────────────
  if (images.length === 0) {
    return (
      <div className="relative aspect-[4/3] rounded-xl border border-border/20 bg-gradient-to-b from-background/80 to-muted/20 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <Box className="h-16 w-16 text-muted-foreground/15" />
        </div>
      </div>
    );
  }

  const sideImages = images.slice(1, 5);
  const extraCount = images.length > 5 ? images.length - 5 : 0;

  return (
    <>
      {/* ── Desktop: featured image + vertical thumbnail column ───────────── */}
      <div className="hidden lg:flex gap-2.5 h-[500px]">
        {/* Featured image — click to open lightbox */}
        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          className="relative flex-1 rounded-xl border border-border/20 bg-gradient-to-b from-background/80 to-muted/20 overflow-hidden group cursor-zoom-in"
          aria-label="Open image lightbox"
        >
          <Image
            src={images[selectedIndex]}
            alt={`${productName} — image ${selectedIndex + 1}`}
            fill
            sizes="(max-width: 1280px) 50vw, 40vw"
            className="object-contain p-6 transition-opacity duration-150"
            priority
          />
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-150 rounded-xl flex items-center justify-center pointer-events-none">
            <ZoomIn className="h-7 w-7 text-white opacity-0 group-hover:opacity-60 transition-opacity duration-150 drop-shadow-lg" />
          </div>
        </button>

        {/* Thumbnail column — only when more than one image */}
        {images.length > 1 && (
          <div className="flex flex-col gap-2 w-[110px]">
            {sideImages.map((src, i) => {
              const actualIndex = i + 1;
              const isLastVisible = i === 3 && extraCount > 0;
              return (
                <button
                  type="button"
                  key={`${src}-${actualIndex}`}
                  onClick={() => setSelectedIndex(actualIndex)}
                  aria-label={`View image ${actualIndex + 1}`}
                  aria-current={actualIndex === selectedIndex ? true : undefined}
                  className={`relative flex-1 rounded-lg border-2 overflow-hidden transition-all duration-150 active:scale-95 ${
                    actualIndex === selectedIndex
                      ? "border-primary ring-1 ring-primary/20"
                      : "border-border/20 hover:border-border/60"
                  }`}
                >
                  <Image
                    src={src}
                    alt={`${productName} thumbnail ${actualIndex + 1}`}
                    fill
                    sizes="110px"
                    className="object-contain p-1"
                  />
                  {isLastVisible && (
                    <div className="absolute inset-0 bg-background/80 flex items-center justify-center rounded-lg">
                      <span className="text-sm font-semibold">+{extraCount + 1}</span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* ── Mobile: main image + horizontal thumbnail strip ───────────────── */}
      <div className="lg:hidden space-y-3">
        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          className="relative w-full aspect-[4/3] max-h-[380px] rounded-xl border border-border/20 bg-gradient-to-b from-background/80 to-muted/20 overflow-hidden group cursor-zoom-in"
          aria-label="Open image lightbox"
        >
          <Image
            src={images[selectedIndex]}
            alt={`${productName} — image ${selectedIndex + 1}`}
            fill
            sizes="100vw"
            className="object-contain p-6"
            priority={selectedIndex === 0}
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-150 pointer-events-none" />
        </button>

        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1">
            {images.map((src, i) => (
              <button
                type="button"
                key={`${src}-${i}`}
                onClick={() => setSelectedIndex(i)}
                aria-label={`View image ${i + 1}`}
                aria-current={i === selectedIndex ? true : undefined}
                className={`relative h-16 w-16 shrink-0 rounded-lg border-2 overflow-hidden transition-all duration-150 active:scale-95 ${
                  i === selectedIndex
                    ? "border-primary ring-1 ring-primary/20"
                    : "border-border/20 hover:border-border/50"
                }`}
              >
                <Image
                  src={src}
                  alt={`${productName} thumbnail ${i + 1}`}
                  fill
                  sizes="64px"
                  className="object-contain p-1"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── Lightbox ──────────────────────────────────────────────────────── */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/92 flex items-center justify-center"
          onClick={() => setLightboxOpen(false)}
        >
          {/* Close */}
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 rounded-full bg-white/10 hover:bg-white/20 p-2 text-white transition-colors"
            aria-label="Close lightbox"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Prev */}
          {images.length > 1 && (
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 rounded-full bg-white/10 hover:bg-white/20 p-3 text-white transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          )}

          {/* Image */}
          <div
            className="relative w-[90vw] h-[85vh] max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[selectedIndex]}
              alt={`${productName} — image ${selectedIndex + 1}`}
              fill
              sizes="90vw"
              className="object-contain"
              priority
            />
          </div>

          {/* Next */}
          {images.length > 1 && (
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 rounded-full bg-white/10 hover:bg-white/20 p-3 text-white transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          )}

          {/* Counter */}
          {images.length > 1 && (
            <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/50 text-sm tabular-nums select-none">
              {selectedIndex + 1} / {images.length}
            </p>
          )}
        </div>
      )}
    </>
  );
}

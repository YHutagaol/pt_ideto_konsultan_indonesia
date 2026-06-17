"use client";

import { useState } from "react";

interface PortfolioGallerySliderProps {
  galleryJson?: string | null;
  partnerName: string;
}

export default function PortfolioGallerySlider({ galleryJson, partnerName }: PortfolioGallerySliderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // Parse images from JSON string safely
  let images: string[] = [];
  try {
    if (galleryJson) {
      const parsed = JSON.parse(galleryJson);
      if (Array.isArray(parsed)) {
        images = parsed.filter((img) => typeof img === "string" && img.trim() !== "");
      }
    }
  } catch (e) {
    console.error("Failed to parse gallery JSON", e);
  }

  if (images.length === 0) {
    return null; // Return nothing if there are no gallery images
  }

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="mt-12 space-y-6">
      {/* Action Button */}
      <div className="flex justify-center">
        <button
          onClick={() => {
            setIsOpen(!isOpen);
            setActiveIndex(0);
          }}
          className={`flex items-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm shadow-md transition-all duration-300 transform hover:scale-105 active:scale-95 ${
            isOpen
              ? "bg-gray-800 text-white hover:bg-gray-900"
              : "bg-emerald-600 text-white hover:bg-emerald-700"
          }`}
        >
          <i className={`fas ${isOpen ? "fa-times-circle" : "fa-images"} text-base`} />
          {isOpen ? "Tutup Galeri Foto" : `Buka Galeri Foto (${images.length} Foto)`}
        </button>
      </div>

      {/* Expanded Minimalist Gallery Frame */}
      {isOpen && (
        <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-gray-100 shadow-xl overflow-hidden transition-all duration-500 animate-fade-in-up">
          {/* Gallery Header Info */}
          <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
            <div>
              <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest bg-emerald-50 px-2.5 py-1 rounded">
                DOKUMENTASI KEGIATAN
              </span>
              <h4 className="text-sm font-bold text-gray-800 mt-1">{partnerName}</h4>
            </div>
            <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {activeIndex + 1} dari {images.length}
            </span>
          </div>

          {/* Main Photo Frame Container */}
          <div className="relative aspect-video sm:aspect-[16/10] bg-gray-900 flex items-center justify-center overflow-hidden group">
            {images.map((imgUrl, idx) => (
              <div
                key={idx}
                className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                  idx === activeIndex ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                }`}
              >
                <img
                  src={imgUrl}
                  alt={`${partnerName} gallery photo ${idx + 1}`}
                  className="w-full h-full object-contain"
                />
              </div>
            ))}

            {/* Navigation Arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-emerald-600 text-white flex items-center justify-center backdrop-blur-sm z-20 transition-all duration-300 opacity-0 group-hover:opacity-100 shadow-md"
                  aria-label="Foto sebelumnya"
                >
                  <i className="fas fa-chevron-left text-sm" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-emerald-600 text-white flex items-center justify-center backdrop-blur-sm z-20 transition-all duration-300 opacity-0 group-hover:opacity-100 shadow-md"
                  aria-label="Foto berikutnya"
                >
                  <i className="fas fa-chevron-right text-sm" />
                </button>
              </>
            )}
          </div>

          {/* Dot Indicators Footer */}
          {images.length > 1 && (
            <div className="py-4 bg-white flex justify-center items-center border-t border-gray-50">
              <div className="flex gap-2">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      idx === activeIndex ? "bg-emerald-600 w-6" : "bg-gray-200 hover:bg-gray-300"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface RoomImageCarouselProps {
  images: string[];
  altText: string;
}

export const RoomImageCarousel: React.FC<RoomImageCarouselProps> = ({ images, altText }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fallback to a default premium room image if images array is empty
  const list = images && images.length > 0 ? images : ["https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80"];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentIndex((prev) => (prev === 0 ? list.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentIndex((prev) => (prev === list.length - 1 ? 0 : prev + 1));
  };

  const handleDotClick = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentIndex(index);
  };

  const activeImage = list[currentIndex] || list[0];

  return (
    <div className="relative w-full h-full overflow-hidden group/carousel" id="carousel-media-viewer">
      {/* Slider Visual Layer */}
      <div className="w-full h-full relative" id="slider-image-layer">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={activeImage}
            alt={`${altText} - Vista ${currentIndex + 1}`}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="w-full h-full object-cover select-none"
            referrerPolicy="no-referrer"
          />
        </AnimatePresence>
      </div>

      {/* Decorative Vignette Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none opacity-60" />

      {/* Direction Control Buttons (Only with > 1 angle) */}
      {list.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#1e1e1c]/80 border border-white/10 flex items-center justify-center text-white opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 hover:bg-[#1e1e1c] hover:scale-105 active:scale-95 cursor-pointer shadow-lg z-10 focus:outline-none focus:opacity-100"
            title="Imagen anterior"
            aria-label="Imagen anterior"
            id="btn-carousel-back"
            type="button"
          >
            <ChevronLeft className="h-4.5 w-4.5" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#1e1e1c]/80 border border-white/10 flex items-center justify-center text-white opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 hover:bg-[#1e1e1c] hover:scale-105 active:scale-95 cursor-pointer shadow-lg z-10 focus:outline-none focus:opacity-100"
            title="Siguiente imagen"
            aria-label="Siguiente imagen"
            id="btn-carousel-forward"
            type="button"
          >
            <ChevronRight className="h-4.5 w-4.5" />
          </button>
        </>
      )}

      {/* Dots Indicator Grid */}
      {list.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-black/45 backdrop-blur-xs z-10">
          {list.map((_, idx) => (
            <button
              key={idx}
              onClick={(e) => handleDotClick(e, idx)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer focus:outline-none ${
                idx === currentIndex ? "w-4.5 bg-[#faf9f6]" : "w-1.5 bg-[#faf9f6]/40 hover:bg-[#faf9f6]/70"
              }`}
              title={`Ir a la imagen ${idx + 1}`}
              aria-label={`Imagen ${idx + 1}`}
              type="button"
            />
          ))}
        </div>
      )}
    </div>
  );
};

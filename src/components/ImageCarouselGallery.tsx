import SmartImage from "./SmartImage";
import { useState, useEffect, useCallback } from "react";

interface CarouselImage {
  src: string;
  alt: string;
  linkHref?: string;
}

interface ImageCarouselProps {
  carouselId: string;
  carouselType: "hero" | "footer";
  images: CarouselImage[];
  autoplay?: boolean;
  transitionDuration?: number;
}

export default function ImageCarouselGallery({
  carouselId,
  carouselType,
  images,
  autoplay = true,
  transitionDuration = 5000,
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToNext = useCallback(() => {
    if (images.length <= 1) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const goToPrevious = useCallback(() => {
    if (images.length <= 1) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const goToSlide = useCallback((index: number) => {
    setIsTransitioning(true);
    setCurrentIndex(index);
  }, []);

  useEffect(() => {
    if (!autoplay || images.length <= 1) return;

    const interval = setInterval(goToNext, transitionDuration);
    return () => clearInterval(interval);
  }, [autoplay, transitionDuration, goToNext, images.length]);

  useEffect(() => {
    if (isTransitioning) {
      const timeout = setTimeout(() => setIsTransitioning(false), 500);
      return () => clearTimeout(timeout);
    }
  }, [isTransitioning]);

  if (!images || images.length === 0) {
    return null;
  }

  const isHero = carouselType === "hero";

  const renderImage = (image: CarouselImage, index: number) => {
    const imageElement = (
      <SmartImage
        src={image.src}
        alt={image.alt}
        fill
        className={`object-cover transition-opacity duration-500 ${
          index === currentIndex ? "opacity-100" : "opacity-0"
        }`}
        priority={index === 0}
      />
    );

    if (image.linkHref) {
      return (
        <a
          href={image.linkHref}
          key={`${carouselId}-image-${index}`}
          className="absolute inset-0"
          aria-label={image.alt}
        >
          {imageElement}
        </a>
      );
    }

    return (
      <div key={`${carouselId}-image-${index}`} className="absolute inset-0">
        {imageElement}
      </div>
    );
  };

  if (isHero) {
    return (
      <div
        id={carouselId}
        className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden bg-stone-50"
      >
        <div className="tns-inner relative w-full h-full">
          <div className="tns-slider tns-carousel relative w-full h-full">
            {images.map((image, index) => renderImage(image, index))}
          </div>
        </div>

        {images.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-stone-800/70 hover:bg-red-800 text-stone-50 p-3 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-800"
              aria-label="Previous slide"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-stone-800/70 hover:bg-red-800 text-stone-50 p-3 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-800"
              aria-label="Next slide"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2">
              {images.map((_, index) => (
                <button
                  key={`${carouselId}-dot-${index}`}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-800 ${
                    index === currentIndex
                      ? "bg-red-800 w-8"
                      : "bg-stone-50/70 hover:bg-stone-50"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                  aria-current={index === currentIndex ? "true" : "false"}
                />
              ))}
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <div
      id={carouselId}
      className="relative w-full bg-stone-50 py-8 md:py-12 overflow-hidden"
    >
      <div className="tns-inner relative">
        <div className="tns-slider tns-carousel flex gap-4 px-4 md:px-8">
          {images.map((image, index) => {
            const visibleIndex =
              (index - currentIndex + images.length) % images.length;
            const isVisible = visibleIndex < 4;

            const imageContent = (
              <SmartImage
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
            );

            return (
              <div
                key={`${carouselId}-footer-${index}`}
                className={`relative flex-shrink-0 w-64 h-48 md:w-80 md:h-60 rounded-lg overflow-hidden shadow-lg transition-all duration-500 ${
                  isVisible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-full absolute"
                }`}
                style={{
                  transform: isVisible
                    ? `translateX(-${currentIndex * 100}%)`
                    : undefined,
                }}
              >
                {image.linkHref ? (
                  <a
                    href={image.linkHref}
                    className="block w-full h-full"
                    aria-label={image.alt}
                  >
                    {imageContent}
                  </a>
                ) : (
                  imageContent
                )}
              </div>
            );
          })}
        </div>
      </div>

      {images.length > 4 && (
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={goToPrevious}
            className="bg-stone-800 hover:bg-red-800 text-stone-50 px-4 py-2 rounded-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-800 focus:ring-offset-2 focus:ring-offset-stone-50"
            aria-label="Previous images"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: Math.ceil(images.length / 4) }).map(
              (_, index) => (
                <button
                  key={`${carouselId}-page-${index}`}
                  onClick={() => goToSlide(index * 4)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 focus:outline-none ${
                    Math.floor(currentIndex / 4) === index
                      ? "bg-red-800 w-4"
                      : "bg-stone-400 hover:bg-stone-600"
                  }`}
                  aria-label={`Go to page ${index + 1}`}
                />
              )
            )}
          </div>

          <button
            onClick={goToNext}
            className="bg-stone-800 hover:bg-red-800 text-stone-50 px-4 py-2 rounded-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-800 focus:ring-offset-2 focus:ring-offset-stone-50"
            aria-label="Next images"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
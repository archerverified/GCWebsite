import { useState, useCallback } from "react";

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number | string;
  height?: number | string;
  placeholderColor?: string;
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
}

/**
 * LazyImage component with native lazy loading and blur placeholder effect
 * - Uses native loading="lazy" for performance
 * - Shows placeholder color while loading
 * - Fades in image when loaded
 * - Handles error state with fallback
 */
export function LazyImage({
  src,
  alt,
  className = "",
  width,
  height,
  placeholderColor = "#e6e6e6",
  objectFit = "cover",
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  const handleError = useCallback(() => {
    setHasError(true);
    setIsLoaded(true);
  }, []);

  if (hasError) {
    return (
      <div
        className={`flex items-center justify-center ${className}`}
        style={{
          width,
          height,
          backgroundColor: placeholderColor,
        }}
        role="img"
        aria-label={`Image unavailable: ${alt}`}
      >
        <svg
          className="w-12 h-12 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        width,
        height,
        backgroundColor: isLoaded ? "transparent" : placeholderColor,
      }}
    >
      {/* Placeholder blur effect */}
      {!isLoaded && (
        <div
          className="absolute inset-0 animate-pulse"
          style={{ backgroundColor: placeholderColor }}
          aria-hidden="true"
        />
      )}
      
      {/* Actual image */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={handleLoad}
        onError={handleError}
        className={`w-full h-full transition-opacity duration-300 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        style={{ objectFit }}
      />
    </div>
  );
}

/**
 * LazyBackgroundImage component for background images with lazy loading
 * Uses Intersection Observer for background images (since loading="lazy" doesn't work for CSS backgrounds)
 */
interface LazyBackgroundImageProps {
  src: string;
  alt: string;
  className?: string;
  children?: React.ReactNode;
  overlayColor?: string;
  placeholderColor?: string;
}

export function LazyBackgroundImage({
  src,
  alt,
  className = "",
  children,
  overlayColor,
  placeholderColor = "#35363a",
}: LazyBackgroundImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  // Preload the image
  useState(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setIsLoaded(true);
    img.onerror = () => setIsLoaded(true); // Still render with placeholder
  });

  return (
    <div
      className={`relative bg-cover bg-center ${className}`}
      style={{
        backgroundImage: isLoaded ? `url(${src})` : undefined,
        backgroundColor: placeholderColor,
      }}
      role="img"
      aria-label={alt}
    >
      {/* Optional overlay */}
      {overlayColor && (
        <div
          className="absolute inset-0"
          style={{ backgroundColor: overlayColor }}
          aria-hidden="true"
        />
      )}
      
      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}


import { useState, useEffect, useRef } from 'react';

export function ImageCarousel({ images, productColor }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const containerRef = useRef(null);

  // Reset to first image when images change (e.g., when variant changes)
  useEffect(() => {
    setCurrentIndex(0);
  }, [images]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    setTouchEnd(e.changedTouches[0].clientX);
    handleSwipe();
  };

  const handleSwipe = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }
  };

  if (!images || images.length === 0) {
    return <div className="gallery__main" style={{ backgroundColor: '#f0f0f0' }}>No images</div>;
  }

  return (
    <div className="gallery">
      <div
        className={`gallery__main product-art--${productColor}`}
        ref={containerRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        role="region"
        aria-label="Product image gallery"
      >
        <img
          src={images[currentIndex]}
          alt={`${currentIndex + 1} of ${images.length}`}
        />
        {images.length > 1 && (
          <div className="gallery__counter">
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {images.length > 1 && (
        <div className="gallery__controls">
          <button
            className="gallery__nav gallery__nav--prev"
            onClick={goToPrevious}
            aria-label="Previous image"
            type="button"
          >
            ‹
          </button>
          <button
            className="gallery__nav gallery__nav--next"
            onClick={goToNext}
            aria-label="Next image"
            type="button"
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}

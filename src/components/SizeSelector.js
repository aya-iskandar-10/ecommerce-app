export function SizeSelector({ selectedVariant, sizeType, selectedSize, onSelectSize }) {
  // Don't show size selector for products without size options
  if (!selectedVariant.sizes || !sizeType || sizeType === 'none') {
    return null;
  }

  const sizes = Object.keys(selectedVariant.sizes);
  const isRequired = sizeType !== 'none' && sizeType !== 'one-size';

  // Get size labels based on type
  const getSizeLabel = (size) => {
    if (sizeType === 'shoe') return size;
    if (sizeType === 'clothing') return size;
    return size;
  };

  // Hide the size selector if there's only one size option
  if (sizes.length === 1 && sizes[0] === 'one-size') {
    return null;
  }

  return (
    <div className="size-selector">
      <div className="size-selector__header">
        <label className="size-selector__label">
          Size
          {isRequired && <span className="size-selector__required">*</span>}
        </label>
      </div>
      <div className="size-selector__options">
        {sizes.map((size) => {
          const stock = selectedVariant.sizes[size];
          const isAvailable = stock > 0;
          const isSelected = selectedSize === size;

          return (
            <button
              key={size}
              className={`size-option ${isSelected ? 'is-selected' : ''} ${!isAvailable ? 'is-disabled' : ''}`}
              onClick={() => onSelectSize(size)}
              type="button"
              disabled={!isAvailable}
              aria-pressed={isSelected}
              aria-label={`${getSizeLabel(size)}${!isAvailable ? ', unavailable' : ''}`}
            >
              {getSizeLabel(size)}
            </button>
          );
        })}
      </div>
      {selectedSize && selectedVariant.sizes[selectedSize] === 0 && (
        <p className="size-selector__error">This size is unavailable</p>
      )}
    </div>
  );
}

export function ColorSelector({ variants, selectedVariant, onSelectVariant }) {
  if (!variants || variants.length <= 1) {
    return null;
  }

  return (
    <div className="color-selector">
      <label className="color-selector__label">Color</label>
      <div className="color-selector__swatches">
        {variants.map((variant) => (
          <button
            key={variant.id}
            className={`color-swatch ${selectedVariant.id === variant.id ? 'is-selected' : ''}`}
            onClick={() => onSelectVariant(variant)}
            type="button"
            style={{ backgroundColor: variant.colorCode }}
            title={variant.color}
            aria-label={`${variant.color}${selectedVariant.id === variant.id ? ', selected' : ''}`}
            aria-pressed={selectedVariant.id === variant.id}
          >
            <span className="color-swatch__label">{variant.color}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

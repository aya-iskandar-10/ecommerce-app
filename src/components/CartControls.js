import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

export function QuantityControl({ value, onChange, label = 'Quantity' }) {
  const isOneItem = value === 1;

  return (
    <div className="quantity-control" aria-label={label}>
      {isOneItem ? (
        <button
          type="button"
          className="quantity-control__trash"
          onClick={() => onChange(0)}
          aria-label="Remove item"
          title="Remove"
        >
          🗑
        </button>
      ) : (
        <button
          type="button"
          onClick={() => onChange(value - 1)}
          aria-label="Decrease quantity"
        >
          −
        </button>
      )}
      <span>{value}</span>
      <button type="button" onClick={() => onChange(value + 1)} aria-label="Increase quantity">
        +
      </button>
    </div>
  );
}

export function AddToCartButton({
  product,
  selectedVariant,
  selectedSize,
  selectedColor,
  quantity = 1,
  onSuccess = null,
}) {
  const { addItem } = useCart();
  const { showToast } = useToast();

  const handleAddToCart = () => {
    // Validate required size selection for size-dependent products
    if (product.sizeType && product.sizeType !== 'none' && product.sizeType !== 'one-size') {
      if (!selectedSize) {
        showToast('Please select a size', 'error');
        return;
      }
    }

    // Validate color selection for variant products
    if (product.hasVariants && !selectedVariant) {
      showToast('Please select a color', 'error');
      return;
    }

    // Check if size is available
    if (selectedSize && selectedVariant.sizes) {
      const sizeStock = selectedVariant.sizes[selectedSize];
      if (sizeStock === undefined || sizeStock < 1) {
        showToast('This size is not available', 'error');
        return;
      }
    }

    // Determine the image to use
    const image = selectedVariant?.images?.[0] || product.images?.[0];
    const price = selectedVariant?.price || product.price;

    addItem(
      product,
      selectedVariant?.id || 'default',
      selectedSize || 'one-size',
      selectedColor || 'default',
      image,
      price,
      quantity
    );

    showToast('Added to cart successfully', 'success');
    if (onSuccess) onSuccess();
  };

  // For products without variants, check stock at product level
  const isOutOfStock = !product.hasVariants && product.stock < 1;
  // For products with variants, check stock at variant+size level
  const variantSizeStock = selectedSize && selectedVariant?.sizes?.[selectedSize];
  const isVariantOutOfStock = product.hasVariants && (!selectedVariant || (selectedSize && variantSizeStock < 1));

  const disabled = isOutOfStock || (product.hasVariants && isVariantOutOfStock);

  return (
    <button
      className="button button--primary add-to-cart"
      type="button"
      disabled={disabled}
      onClick={handleAddToCart}
    >
      {isOutOfStock || isVariantOutOfStock ? 'Out of stock' : 'Add to cart'}
    </button>
  );
}

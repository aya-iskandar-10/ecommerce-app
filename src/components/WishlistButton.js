import { useWishlist } from '../context/WishlistContext';

export function WishlistButton({ product, size = 'medium' }) {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const inWishlist = isInWishlist(product.id);

  return (
    <button
      className={`wishlist-button wishlist-button--${size} ${inWishlist ? 'is-active' : ''}`}
      onClick={() => toggleWishlist(product)}
      type="button"
      aria-label={inWishlist ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
      aria-pressed={inWishlist}
      title={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
    >
      <span className="wishlist-icon">{inWishlist ? '♥' : '♡'}</span>
    </button>
  );
}

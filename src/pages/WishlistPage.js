import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { PageIntro, ProductCard } from '../components/UI';

export function WishlistPage() {
  const { wishlistItems } = useWishlist();

  return (
    <section className="page-section wishlist-page">
      <PageIntro
        eyebrow="Your saved collection"
        title={wishlistItems.length ? 'Your wishlist.' : 'Save something good.'}
        description={wishlistItems.length ? `${wishlistItems.length} product${wishlistItems.length === 1 ? '' : 's'} waiting for you.` : 'Keep track of the products you love and come back when the moment feels right.'}
      />
      {wishlistItems.length ? (
        <div className="product-grid">{wishlistItems.map((product) => <ProductCard key={product.id} product={product} />)}</div>
      ) : (
        <div className="empty-wishlist">
          <span className="empty-wishlist__mark">♡</span>
          <h2>Your wishlist is currently empty.</h2>
          <p>Tap the heart on any product to save it here.</p>
          <Link className="button button--primary" to="/products">Continue shopping</Link>
        </div>
      )}
    </section>
  );
}
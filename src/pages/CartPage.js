import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { QuantityControl } from '../components/CartControls';
import { PageIntro, ProductPrice } from '../components/UI';

export function CartPage() {
  const { items, subtotal, updateQuantity } = useCart();

  if (!items.length) {
    return (
      <section className="page-section cart-page">
        <PageIntro
          eyebrow="Your shopping bag"
          title="Your cart is waiting."
          description="When you find something you love, it will be collected here for an easy checkout."
        />
        <div className="empty-cart">
          <span className="empty-cart__mark">+</span>
          <p>Your cart is currently empty.</p>
          <Link className="button button--primary" to="/products">
            Continue shopping
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="page-section cart-page">
      <PageIntro
        eyebrow="Your shopping bag"
        title="Your cart."
        description={`${items.length} product${items.length === 1 ? '' : 's'} selected for you.`}
      />
      <div className="cart-layout">
        <div className="cart-items">
          {items.map((item) => (
            <article className="cart-item" key={item.cartItemId}>
              <Link to={`/products/${item.productId}`} state={{ from: '/cart' }}>
                <img src={item.image} alt={item.productName} />
              </Link>
              <div className="cart-item__info">
                <p className="eyebrow">{item.productBrand}</p>
                <Link className="cart-item__product-link" to={`/products/${item.productId}`} state={{ from: '/cart' }}>
                  <h2>{item.productName}</h2>
                </Link>
                <p>{item.category}</p>
                
                {/* Display variant information */}
                {item.selectedColor && item.selectedColor !== 'default' && (
                  <p className="cart-item__variant">Color: {item.selectedColor}</p>
                )}
                {item.selectedSize && item.selectedSize !== 'one-size' && (
                  <p className="cart-item__variant">Size: {item.selectedSize}</p>
                )}

              </div>
              <QuantityControl
                value={item.quantity}
                onChange={(quantity) => updateQuantity(item.cartItemId, quantity)}
                label={`Quantity for ${item.productName}`}
              />
              <ProductPrice value={item.price * item.quantity} />
            </article>
          ))}
        </div>
        <aside className="cart-summary">
          <p className="eyebrow">Order summary</p>
          <h2>Almost yours.</h2>
          <div className="summary-row">
            <span>Subtotal</span>
            <strong>${subtotal.toFixed(2)}</strong>
          </div>
          <div className="summary-row">
            <span>Delivery</span>
            <span>Calculated at checkout</span>
          </div>
          <div className="summary-total">
            <span>Total</span>
            <strong>${subtotal.toFixed(2)}</strong>
          </div>
          <button className="button button--primary checkout-button" type="button" disabled>
            Checkout coming soon
          </button>
          <Link className="continue-link" to="/products">
            ← Continue shopping
          </Link>
        </aside>
      </div>
    </section>
  );
}

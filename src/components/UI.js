import { Link, useLocation } from 'react-router-dom';
import { WishlistButton } from './WishlistButton';
import { getFirstProductImage, getFirstVariant, getFirstVariantImage, getProductOldPrice, getProductPrice, hasProductVariants } from '../utils/catalog';

export function Button({ children, to, variant = 'primary', state, ...props }) {
  const className = `button button--${variant}`;
  if (to) return <Link className={className} to={to} state={state}>{children}</Link>;
  return <button className={className} {...props}>{children}</button>;
}

export function Badge({ children }) {
  return <span className="badge">{children}</span>;
}

export function Rating({ value }) {
  return <span className="rating" aria-label={`${value} out of 5 stars`}><span aria-hidden="true">★</span> {value}</span>;
}

export function ProductPrice({ value }) {
  return <span className="product-price">${value.toFixed(2)}</span>;
}

export function ProductCard({ product }) {
  const location = useLocation();
  const returnPath = `${location.pathname}${location.search}`;
  
  // Handle both variant and non-variant products
  const firstVariant = getFirstVariant(product);
  const displayImage = hasProductVariants(product)
    ? getFirstVariantImage(product, firstVariant)
    : getFirstProductImage(product);
  
  const displayPrice = getProductPrice(product, firstVariant);
    
  const displayOldPrice = getProductOldPrice(product, firstVariant);
  
  const colorClass = hasProductVariants(product)
    ? firstVariant?.color?.toLowerCase()
    : product.color;

  return (
    <article className="product-card">
      <Link 
        className={`product-art product-art--${colorClass}`} 
        to={`/products/${product.id}`} 
        state={{ from: returnPath }}
      >
        <img src={displayImage} alt={product.name} />
        {product.badge && <span className="discount-badge">{product.badge}</span>}
      </Link>
      <WishlistButton product={product} size="small" />
      <div className="product-card__body">
        <p className="eyebrow">{product.brand}</p>
        <h3>{product.name}</h3>
        <div className="product-card__meta">
          <Rating value={product.rating} />
          <span>{product.category}</span>
        </div>
        <div className="product-card__footer">
          <div>
            <ProductPrice value={displayPrice} />
            {displayOldPrice && <del>${displayOldPrice.toFixed(2)}</del>}
          </div>
          <Button 
            variant="subtle" 
            to={`/products/${product.id}`} 
            state={{ from: returnPath }}
          >
            View product
          </Button>
        </div>
      </div>
    </article>
  );
}

export function ProductSection({ eyebrow, title, subtitle, products, cta, tinted = false }) {
  return (
    <section className={`section product-section${tinted ? ' section--tinted' : ''}`}>
      <div className="section-heading">
        <div>
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h2>{title}</h2>
          {subtitle && <p className="section-subtitle">{subtitle}</p>}
        </div>
        {cta && <Link to={cta.to}>{cta.label} <span>→</span></Link>}
      </div>
      <div className="product-grid">
        {products.map((product) => <ProductCard key={product.id} product={product} />)}
      </div>
    </section>
  );
}

export function CategoryCard({ category }) {
  return <Link className="category-card" to={`/products?category=${category.id}`}>
    {category.image && <img src={category.image} alt="" />}
    <span className="category-card__overlay" />
    <span className="category-card__content"><span className="category-card__icon">{category.icon}</span><strong>{category.name}</strong><span>{category.description}</span></span>
  </Link>;
}

export function PageIntro({ eyebrow, title, description }) {
  return <div className="page-intro"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p>{description}</p></div>;
}

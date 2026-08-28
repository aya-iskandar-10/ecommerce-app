import { useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { products } from '../data/mockData';
import { AddToCartButton, QuantityControl } from '../components/CartControls';
import { Badge, PageIntro, ProductPrice, Rating } from '../components/UI';
import { ImageCarousel } from '../components/ImageCarousel';
import { ColorSelector } from '../components/ColorSelector';
import { SizeSelector } from '../components/SizeSelector';

export function ProductDetailsPage() {
  const { productId } = useParams();
  const location = useLocation();
  const product = products.find((item) => item.id === Number(productId));
  
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(
    product?.hasVariants ? product.variants[0] : null
  );
  const [selectedSize, setSelectedSize] = useState(null);

  if (!product) {
    return (
      <section className="page-section">
        <PageIntro
          eyebrow="Product not found"
          title="That product has moved on."
          description="Try browsing the collection to find another everyday favorite."
        />
        <Link className="button button--primary" to="/products">
          Browse products
        </Link>
      </section>
    );
  }

  // Get current images based on variant or fallback to product images
  const currentImages = selectedVariant?.images || product.images || [];
  
  // Determine display price based on variant or product
  const displayPrice = selectedVariant?.price || product.price;
  const displayOldPrice = selectedVariant?.oldPrice || product.oldPrice;
  
  // Determine stock info
  let stockInfo = null;
  if (product.hasVariants && selectedVariant) {
    if (selectedSize && selectedVariant.sizes) {
      const sizeStock = selectedVariant.sizes[selectedSize];
      stockInfo = sizeStock > 0 ? `${sizeStock} in stock` : 'Out of stock';
    }
  } else if (!product.hasVariants) {
    stockInfo = product.stock > 0 ? `${product.stock} in stock` : 'Out of stock';
  }

  const handleAddToCart = () => {
    // Reset quantity after successful add
    setQuantity(1);
  };

  // Get the product color name for CSS classes
  const productColorClass = selectedVariant?.color?.toLowerCase() || product.color || 'default';

  return (
    <section className="product-detail page-section">
      <Link className="back-link" to={location.state?.from || '/products'}>
        ← Back to products
      </Link>
      
      <div className="product-detail__grid">
        {/* Gallery Section */}
        <div>
          <ImageCarousel images={currentImages} productColor={productColorClass} />
        </div>

        {/* Info Section */}
        <div className="product-detail__info">
          <p className="eyebrow">
            {product.brand} / {product.category}
          </p>
          <h1>{product.name}</h1>
          
          <div className="detail-rating">
            <Rating value={product.rating} />
            <span>{product.reviewCount} reviews</span>
          </div>

          <div className="detail-price">
            <ProductPrice value={displayPrice} />
            {displayOldPrice && <del>${displayOldPrice.toFixed(2)}</del>}
            {product.badge && <Badge>{product.badge}</Badge>}
          </div>

          <p className="detail-short-description">{product.shortDescription}</p>

          {stockInfo && (
            <p className={stockInfo.includes('Out') ? 'stock' : 'stock stock--available'}>
              {stockInfo}
            </p>
          )}

          {/* Color Selector for variant products */}
          {product.hasVariants && (
            <ColorSelector
              variants={product.variants}
              selectedVariant={selectedVariant}
              onSelectVariant={setSelectedVariant}
            />
          )}

          {/* Size Selector for size-dependent products */}
          {product.hasVariants && (
            <SizeSelector
              selectedVariant={selectedVariant}
              sizeType={product.sizeType}
              selectedSize={selectedSize}
              onSelectSize={setSelectedSize}
            />
          )}

          {/* Quantity and Add to Cart */}
          <div className="detail-actions">
            <QuantityControl
              value={quantity}
              onChange={(nextQuantity) => setQuantity(Math.max(1, nextQuantity))}
            />
            <AddToCartButton
              product={product}
              selectedVariant={selectedVariant}
              selectedSize={selectedSize}
              selectedColor={selectedVariant?.color}
              quantity={quantity}
              onSuccess={handleAddToCart}
            />
          </div>

          <div className="detail-note">
            Free delivery on orders over $50. Easy returns within 30 days.
          </div>
        </div>
      </div>

      {/* Description and Features */}
      <div className="product-detail__description">
        <div>
          <p className="eyebrow">The details</p>
          <h2>Made for daily use.</h2>
          <p>{product.description}</p>
        </div>
        <div className="specifications">
          <h3>Features & specifications</h3>
          {product.features.map((feature) => (
            <div className="specification" key={feature.label}>
              <span>{feature.label}</span>
              <strong>{feature.value}</strong>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

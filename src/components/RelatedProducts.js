import { getRelatedProducts } from '../utils/catalog';
import { ProductCard } from './UI';

export function RelatedProducts({ product }) {
  const relatedProducts = getRelatedProducts(product);
  if (!relatedProducts.length) return null;

  return (
    <section className="related-products section--tinted" aria-labelledby="related-products-heading">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Keep exploring</p>
          <h2 id="related-products-heading">You may also like</h2>
        </div>
      </div>
      <div className="product-grid">
        {relatedProducts.map((relatedProduct) => <ProductCard key={relatedProduct.id} product={relatedProduct} />)}
      </div>
    </section>
  );
}
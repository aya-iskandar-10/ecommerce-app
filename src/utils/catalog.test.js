import { getFirstProductImage, getFirstVariantImage, getProductOldPrice, getProductPrice, isProductAvailable, getRelatedProducts } from './catalog';
import { categories, homepageProductIds, occasions, products } from '../data/mockData';

test('related products exclude the current product and prefer matching category data', () => {
  const headphones = products.find((product) => product.name === 'Wireless Headphones');
  const related = getRelatedProducts(headphones, 4);

  expect(related).toHaveLength(4);
  expect(related).not.toContain(headphones);
  expect(related[0].categoryId).toBe('electronics');
});

test('gets effective prices for non-variant and variant products', () => {
  const product = { price: 25, hasVariants: false };
  const variantProduct = { hasVariants: true, price: 10, variants: [{ price: 42 }, { price: 55 }] };

  expect(getProductPrice(product)).toBe(25);
  expect(getProductPrice(variantProduct)).toBe(42);
  expect(getProductPrice(variantProduct, variantProduct.variants[1])).toBe(55);
});

test('gets effective old prices and safely handles missing old prices', () => {
  const product = { oldPrice: 30, hasVariants: false };
  const variantProduct = { hasVariants: true, variants: [{ price: 42, oldPrice: 50 }, { price: 55 }] };

  expect(getProductOldPrice(product)).toBe(30);
  expect(getProductOldPrice(variantProduct)).toBe(50);
  expect(getProductOldPrice(variantProduct, variantProduct.variants[1])).toBeUndefined();
  expect(getProductOldPrice({ price: 20, hasVariants: false })).toBeUndefined();
});

test('determines availability from product or size-level stock', () => {
  expect(isProductAvailable({ hasVariants: false, stock: 4 })).toBe(true);
  expect(isProductAvailable({ hasVariants: false, stock: 0 })).toBe(false);
  expect(isProductAvailable({ hasVariants: true, variants: [{ sizes: { '40': 0, '41': 3 } }] })).toBe(true);
  expect(isProductAvailable({ hasVariants: true, variants: [{ sizes: { '40': 0, '41': 0 } }] })).toBe(false);
});

test('gets the primary image from the correct product level', () => {
  const product = { hasVariants: false, images: ['product-image.jpg'] };
  const variantProduct = { hasVariants: true, variants: [{ images: ['variant-image.jpg'] }] };

  expect(getFirstProductImage(product)).toBe('product-image.jpg');
  expect(getFirstVariantImage(variantProduct)).toBe('variant-image.jpg');
});

test('expanded catalog has the expected product distribution and unique IDs', () => {
  expect(products).toHaveLength(100);
  expect(new Set(products.map((product) => product.id)).size).toBe(products.length);

  expect(products.filter((product) => product.categoryId === 'electronics')).toHaveLength(25);
  expect(products.filter((product) => product.categoryId === 'fashion')).toHaveLength(25);
  expect(products.filter((product) => product.categoryId === 'beauty')).toHaveLength(15);
  expect(products.filter((product) => product.categoryId === 'home-living')).toHaveLength(15);
  expect(products.filter((product) => product.categoryId === 'sports')).toHaveLength(10);
  expect(products.filter((product) => product.categoryId === 'accessories')).toHaveLength(10);
});

test('every product satisfies the current catalog contract', () => {
  const categoryIds = new Set(categories.map((category) => category.id));
  const requiredFields = ['id', 'name', 'description', 'shortDescription', 'category', 'categoryId', 'subcategory', 'brand', 'tags', 'rating', 'reviewCount', 'sizeType', 'hasVariants', 'features'];

  products.forEach((product) => {
    requiredFields.forEach((field) => expect(product).toHaveProperty(field));
    expect(typeof product.id).toBe('number');
    expect(categoryIds.has(product.categoryId)).toBe(true);
    expect(typeof product.category).toBe('string');
    expect(typeof product.subcategory).toBe('string');
    expect(typeof product.brand).toBe('string');
    expect(Array.isArray(product.tags)).toBe(true);
    expect(Array.isArray(product.features)).toBe(true);
    product.features.forEach((feature) => {
      expect(typeof feature.label).toBe('string');
      expect(typeof feature.value).toBe('string');
    });
  });
});

test('variant products have valid unique variants and non-variant products have direct inventory data', () => {
  const variantIds = products.flatMap((product) => product.variants || []).map((variant) => variant.id);
  expect(new Set(variantIds).size).toBe(variantIds.length);
  expect(variantIds.every((variantId) => typeof variantId === 'string')).toBe(true);

  products.forEach((product) => {
    if (product.hasVariants) {
      expect(Array.isArray(product.variants)).toBe(true);
      expect(product.variants.length).toBeGreaterThan(0);
      product.variants.forEach((variant) => {
        expect(typeof variant.price).toBe('number');
        expect(variant.price).toBeGreaterThan(0);
        expect(Array.isArray(variant.images)).toBe(true);
        expect(variant.images.length).toBeGreaterThan(0);
        expect(variant.sizes && typeof variant.sizes).toBe('object');
        Object.entries(variant.sizes).forEach(([size, stock]) => {
          expect(typeof size).toBe('string');
          expect(typeof stock).toBe('number');
          expect(stock).toBeGreaterThanOrEqual(0);
        });
      });
    } else {
      expect(typeof product.price).toBe('number');
      expect(product.price).toBeGreaterThan(0);
      expect(typeof product.stock).toBe('number');
      expect(product.stock).toBeGreaterThanOrEqual(0);
      expect(Array.isArray(product.images)).toBe(true);
      expect(product.images.length).toBeGreaterThan(0);
    }
  });
});

test('homepage and occasion product references resolve to catalog products', () => {
  const productIds = new Set(products.map((product) => product.id));
  Object.values(homepageProductIds).flat().forEach((productId) => {
    expect(productIds.has(productId)).toBe(true);
  });
  occasions.forEach((occasion) => {
    occasion.productIds.forEach((productId) => expect(productIds.has(productId)).toBe(true));
  });
});

test('preserves sale prices in expanded compact catalog rows', () => {
  const blazer = products.find((product) => product.name === 'Unstructured Blazer');
  const lamp = products.find((product) => product.name === 'Arc Floor Lamp');

  expect(blazer.oldPrice).toBe(179);
  expect(blazer.stock).toBeGreaterThan(0);
  expect(lamp.oldPrice).toBe(219);
  expect(lamp.stock).toBeGreaterThan(0);
});
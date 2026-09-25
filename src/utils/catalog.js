import { homepageProductIds, occasions, products } from '../data/mockData';

export function getProductById(productId) {
  return products.find((product) => product.id === Number(productId));
}

export function getProductsByCategory(categoryId) {
  return products.filter((product) => product.categoryId === categoryId);
}

export function hasProductVariants(product) {
  return product?.hasVariants === true;
}

export function getFirstVariant(product) {
  return hasProductVariants(product) ? product.variants?.[0] : undefined;
}

export function getFirstProductImage(product) {
  return product?.images?.[0];
}

export function getFirstVariantImage(product, variant = getFirstVariant(product)) {
  return variant?.images?.[0];
}

export function getProductPrice(product, variant = getFirstVariant(product)) {
  if (!product) return undefined;
  return hasProductVariants(product) ? variant?.price ?? product.price : product.price;
}

export function getProductOldPrice(product, variant = getFirstVariant(product)) {
  if (!product) return undefined;
  return hasProductVariants(product) ? variant?.oldPrice ?? product.oldPrice : product.oldPrice;
}

export function isProductAvailable(product) {
  if (!product) return false;
  if (!hasProductVariants(product)) return product.stock > 0;

  return (product.variants || []).some((variant) =>
    Object.values(variant.sizes || {}).some((stock) => stock > 0)
  );
}

export function getProductsByIds(productIds) {
  return productIds.map((productId) => products.find((product) => product.id === productId)).filter(Boolean);
}

export function getFeaturedOccasion() {
  return occasions.find((occasion) => occasion.active && occasion.featured) || occasions.find((occasion) => occasion.active);
}

export function getProductsForOccasion(occasionId) {
  const occasion = occasions.find((item) => item.id === occasionId);
  return occasion ? getProductsByIds(occasion.productIds) : [];
}

export function getHomepageProducts(section) {
  return getProductsByIds(homepageProductIds[section] || []);
}

export function getRelatedProducts(product, limit = 4) {
  if (!product) return [];

  return products
    .filter((candidate) => candidate.id !== product.id)
    .map((candidate) => {
      const sharedTags = (product.tags || []).filter((tag) => (candidate.tags || []).includes(tag)).length;
      const priceDifference = Math.abs(getProductPrice(product) - getProductPrice(candidate));
      const priceRangeScore = priceDifference <= Math.max(getProductPrice(product) * 0.35, 25) ? 1 : 0;
      const relatedCategoryMatch = (product.relatedCategories || []).includes(candidate.categoryId)
        || (candidate.relatedCategories || []).includes(product.categoryId);
      const score = (candidate.subcategory === product.subcategory ? 100 : 0)
        + (candidate.categoryId === product.categoryId ? 40 : 0)
        + sharedTags * 8
        + (candidate.brand === product.brand ? 5 : 0)
        + (relatedCategoryMatch ? 3 : 0)
        + priceRangeScore;

      return { candidate, score, sharedTags, priceDifference };
    })
    .sort((first, second) => second.score - first.score || first.priceDifference - second.priceDifference || second.sharedTags - first.sharedTags)
    .slice(0, limit)
    .map(({ candidate }) => candidate);
}
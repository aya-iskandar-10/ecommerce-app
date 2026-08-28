import { categories, products } from '../data/mockData';

const priceOptions = [
  ['under-50', 'Under $50'],
  ['50-100', '$50 - $100'],
  ['100-250', '$100 - $250'],
  ['250-plus', '$250+'],
];

export const catalogCategories = categories.filter((category) => products.some((product) => product.categoryId === category.id));
export const catalogBrands = [...new Set(products.map((product) => product.brand))].sort();

export function ProductFilters({ values, onChange, onClear, mobile = false }) {
  return <div className={`filters-content${mobile ? ' filters-content--mobile' : ''}`}>
    <div className="filter-group"><h3>Categories</h3><label className="filter-option"><input type="radio" name={mobile ? 'mobile-category' : 'category'} checked={!values.category} onChange={() => onChange('category', '')} /> <span>All products</span><small>{products.length}</small></label>{catalogCategories.map((category) => <label className="filter-option" key={category.id}><input type="radio" name={mobile ? 'mobile-category' : 'category'} checked={values.category === category.id} onChange={() => onChange('category', category.id)} /> <span>{category.name}</span><small>{products.filter((product) => product.categoryId === category.id).length}</small></label>)}</div>
  <div className="filter-group"><h3>Brands</h3>{catalogBrands.map((brand) => <label className="filter-option" key={brand}><input type="radio" name={mobile ? 'mobile-brand' : 'brand'} checked={values.brand === brand} onChange={() => onChange('brand', brand)} /> <span>{brand}</span></label>)}</div>
    <div className="filter-group"><h3>Price</h3>{priceOptions.map(([value, label]) => <label className="filter-option" key={value}><input type="radio" name={mobile ? 'mobile-price' : 'price'} checked={values.price === value} onChange={() => onChange('price', value)} /> <span>{label}</span></label>)}</div>
    <div className="filter-group"><h3>Availability</h3><label className="filter-option"><input type="checkbox" checked={values.availability === 'in-stock'} onChange={(event) => onChange('availability', event.target.checked ? 'in-stock' : '')} /> <span>In stock</span></label></div>
    <button className="clear-filters" type="button" onClick={onClear}>Clear filters</button>
  </div>;
}

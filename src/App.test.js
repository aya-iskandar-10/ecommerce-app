import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

test('renders the marketplace home page', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /find your next everyday favorite/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /shop the collection/i })).toBeInTheDocument();
});

test('renders a not found page for an unknown route', () => {
  window.history.pushState({}, '', '/does-not-exist');
  render(<App />);
  expect(screen.getByRole('heading', { name: /wrong turn/i })).toBeInTheDocument();
});

test('renders products from a routed path', () => {
  window.history.pushState({}, '', '/products');
  render(<App />);
  expect(screen.getByRole('heading', { name: /shop all products/i })).toBeInTheDocument();
});

test('displays image carousel on product details page', () => {
  window.history.pushState({}, '', '/products/3');
  render(<App />);
  // Wireless Headphones is a product without variants
  expect(screen.getByRole('heading', { name: /wireless headphones/i })).toBeInTheDocument();
  // Should show image counter for carousel
  expect(screen.getByText(/1 \/ 3/)).toBeInTheDocument();
});

test('adds a non-variant product to cart and manages quantity', () => {
  window.history.pushState({}, '', '/products/3');
  render(<App />);
  // Wireless Headphones is a non-variant product
  fireEvent.click(screen.getByRole('button', { name: /add to cart/i }));
  // Check for success toast
  expect(screen.getByText(/added to cart successfully/i)).toBeInTheDocument();
  fireEvent.click(screen.getByRole('link', { name: /cart 1/i }));
  expect(screen.getByRole('heading', { name: 'Your cart.' })).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: /increase quantity/i }));
  expect(screen.getByRole('link', { name: /cart 2/i })).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: /remove/i }));
  expect(screen.getByText(/your cart is currently empty/i)).toBeInTheDocument();
});

test('filters products by category, brand, and availability', () => {
  window.history.pushState({}, '', '/products?category=electronics&brand=Auraline&availability=in-stock');
  render(<App />);
  expect(screen.getByRole('heading', { name: 'Wireless Headphones' })).toBeInTheDocument();
  expect(screen.queryByRole('heading', { name: 'Smart Watch' })).not.toBeInTheDocument();
  expect(screen.getByRole('button', { name: /brand:|auraline/i })).toBeInTheDocument();
});

test('searches across product data and supports an empty state', () => {
  window.history.pushState({}, '', '/products?search=headphones');
  render(<App />);
  expect(screen.getByRole('heading', { name: 'Wireless Headphones' })).toBeInTheDocument();
  expect(screen.queryByRole('heading', { name: 'Smart Watch' })).not.toBeInTheDocument();

  window.history.pushState({}, '', '/products?search=does-not-exist');
  render(<App />);
  expect(screen.getByRole('heading', { name: /nothing matched this search/i })).toBeInTheDocument();
});

test('sorts by price and clears URL filters', () => {
  window.history.pushState({}, '', '/products?sort=price-low');
  render(<App />);
  expect(screen.getByRole('heading', { name: 'Desk Lamp' })).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: /clear filters/i }));
  expect(screen.getByRole('heading', { name: /shop all products/i })).toBeInTheDocument();
});

test('home category links open the matching catalog route and cart survives navigation', () => {
  window.history.pushState({}, '', '/');
  render(<App />);
  fireEvent.click(screen.getByRole('link', { name: /electronics/i }));
  expect(screen.getByRole('heading', { name: 'Electronics' })).toBeInTheDocument();
  // Navigate to a specific product to add to cart
  fireEvent.click(screen.getByRole('link', { name: /wireless headphones/i }));
  fireEvent.click(screen.getByRole('button', { name: /add to cart/i }));
  // Check cart count
  expect(screen.getByRole('link', { name: /cart 1/i })).toBeInTheDocument();
});

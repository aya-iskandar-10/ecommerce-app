import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import App from './App';

test('renders the marketplace home page', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: 'Back to School' })).toBeInTheDocument();
  expect(screen.queryByRole('link', { name: /shop the collection/i })).not.toBeInTheDocument();
  expect(screen.queryByRole('link', { name: /browse categories/i })).not.toBeInTheDocument();
});

test('navbar cart and wishlist icons keep their routes and accessible labels', () => {
  window.history.pushState({}, '', '/');
  render(<App />);
  expect(screen.getByRole('link', { name: /cart 0/i })).toHaveAttribute('href', '/cart');
  expect(screen.getByRole('link', { name: /wishlist 0/i })).toHaveAttribute('href', '/wishlist');
});

test('renders the featured occasion and marketplace product sections', () => {
  window.history.pushState({}, '', '/');
  render(<App />);

  expect(screen.getByRole('heading', { name: 'Back to School' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /shop this occasion/i })).toHaveAttribute('href', '/products?category=electronics');
  expect(screen.getByRole('heading', { name: 'Shop by category' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Deals worth a closer look' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Trending Now' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Recommended for You' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /electronics/i })).toHaveAttribute('href', '/products?category=electronics');
  expect(screen.getByRole('link', { name: /fashion/i })).toHaveAttribute('href', '/products?category=fashion');
});

test('removes standalone categories navigation while preserving homepage category filtering', () => {
  cleanup();
  window.history.pushState({}, '', '/');
  render(<App />);
  expect(screen.queryByRole('link', { name: /^categories$/i })).not.toBeInTheDocument();

  cleanup();
  window.history.pushState({}, '', '/categories');
  render(<App />);
  expect(screen.getByRole('heading', { name: /wrong turn/i })).toBeInTheDocument();

  cleanup();
  window.history.pushState({}, '', '/products?category=electronics');
  render(<App />);
  expect(screen.getByRole('heading', { name: 'Electronics' })).toBeInTheDocument();
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

test('renders the expanded catalog and keeps category, availability, and search behavior working', () => {
  window.history.pushState({}, '', '/products');
  render(<App />);
  expect(screen.getByText('100', { selector: 'strong' })).toBeInTheDocument();
  expect(screen.getAllByRole('link').filter((link) => link.getAttribute('href')?.match(/^\/products\/\d+$/))).toHaveLength(200);

  cleanup();
  window.history.pushState({}, '', '/products?category=electronics&availability=in-stock');
  render(<App />);
  expect(screen.getByText('24', { selector: 'strong' })).toBeInTheDocument();

  cleanup();
  window.history.pushState({}, '', '/products?search=passport');
  render(<App />);
  expect(screen.getByRole('heading', { name: 'Travel Passport Holder' })).toBeInTheDocument();
  expect(screen.queryByRole('heading', { name: 'Wireless Headphones' })).not.toBeInTheDocument();
});

test('displays image carousel on product details page', () => {
  window.history.pushState({}, '', '/products/3');
  render(<App />);
  // Wireless Headphones is a product without variants
  expect(screen.getByRole('heading', { name: /wireless headphones/i })).toBeInTheDocument();
  // Should show image counter for carousel
  expect(screen.getByText(/1 \/ 3/)).toBeInTheDocument();
});

test('supports representative variant selection and resets detail state when navigating products', () => {
  window.history.pushState({}, '', '/products/35');
  render(<App />);
  expect(screen.getByRole('heading', { name: 'Court Low Sneakers' })).toBeInTheDocument();
  expect(screen.getByText('$88.00')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /40/ })).toBeInTheDocument();
  fireEvent.click(screen.getByTitle('Green'));
  expect(screen.getByText(/1 \/ 2/)).toBeInTheDocument();

  window.history.pushState({}, '', '/products/37');
  render(<App />);
  expect(screen.getByRole('heading', { name: 'Merino Cardigan' })).toBeInTheDocument();
  expect(screen.getByText('$98.00')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /camel/i })).toHaveAttribute('aria-pressed', 'true');
});

test('adds a non-variant product to cart and manages quantity', () => {
  window.history.pushState({}, '', '/products/3');
  render(<App />);
  // Wireless Headphones is a non-variant product
  fireEvent.click(screen.getByRole('button', { name: /add to cart/i }));
  // Check for success toast
  expect(screen.getByText(/^Added to cart$/i)).toBeInTheDocument();
  expect(screen.queryByText(/added to cart successfully/i)).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole('link', { name: /cart 1/i }));
  expect(screen.getByRole('heading', { name: 'Your cart.' })).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: /increase quantity/i }));
  expect(screen.getByRole('link', { name: /cart 2/i })).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: /decrease quantity/i }));
  fireEvent.click(screen.getByRole('button', { name: 'Remove item' }));
  expect(screen.getByText(/your cart is currently empty/i)).toBeInTheDocument();
});

test('cart product image and name open the existing product details route', () => {
  cleanup();
  window.history.pushState({}, '', '/products/3');
  render(<App />);
  fireEvent.click(screen.getByRole('button', { name: /add to cart/i }));
  fireEvent.click(screen.getByRole('link', { name: /cart 1/i }));

  const productLinks = screen.getAllByRole('link', { name: /wireless headphones/i });
  expect(productLinks).toHaveLength(2);
  expect(productLinks[0]).toHaveAttribute('href', '/products/3');
  fireEvent.click(productLinks[1]);
  expect(screen.getByRole('heading', { name: 'Wireless Headphones' })).toBeInTheDocument();
});

test('cart trash action removes the item without navigating', () => {
  cleanup();
  window.history.pushState({}, '', '/products/3');
  render(<App />);
  fireEvent.click(screen.getByRole('button', { name: /add to cart/i }));
  fireEvent.click(screen.getByRole('link', { name: /cart 1/i }));

  fireEvent.click(screen.getByRole('button', { name: 'Remove item' }));
  expect(window.location.pathname).toBe('/cart');
  expect(screen.getByText(/your cart is currently empty/i)).toBeInTheDocument();
});

test('product details resets the window scroll position when the product route changes', () => {
  cleanup();
  window.scrollTo = jest.fn();
  window.history.pushState({}, '', '/products/3');
  render(<App />);
  expect(window.scrollTo).toHaveBeenCalledWith(0, 0);

  window.history.pushState({}, '', '/products/12');
  render(<App />);
  expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
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

test('adds and removes a product from the wishlist and updates the navbar count', () => {
  window.history.pushState({}, '', '/products');
  render(<App />);
  const wishlistButton = screen.getByRole('button', { name: /add running shoes to wishlist/i });

  fireEvent.click(wishlistButton);
  expect(screen.getByRole('link', { name: /wishlist 1/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /remove running shoes from wishlist/i })).toBeInTheDocument();
  expect(screen.getByText(/added to wishlist/i)).toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: /remove running shoes from wishlist/i }));
  expect(screen.getByRole('link', { name: /wishlist 0/i })).toBeInTheDocument();
  expect(screen.getByText(/removed from wishlist/i)).toBeInTheDocument();
});

test('renders the empty wishlist state and wishlist page products', () => {
  window.history.pushState({}, '', '/wishlist');
  render(<App />);
  expect(screen.getByRole('heading', { name: /your wishlist is currently empty/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /continue shopping/i })).toBeInTheDocument();

  window.history.pushState({}, '', '/products');
  render(<App />);
  fireEvent.click(screen.getByRole('button', { name: /add wireless headphones to wishlist/i }));
  fireEvent.click(screen.getByRole('link', { name: /wishlist 1/i }));
  expect(screen.getByRole('heading', { name: 'Wireless Headphones' })).toBeInTheDocument();
});

test('shares a product by copying its URL when Web Share is unavailable', async () => {
  Object.defineProperty(navigator, 'share', { configurable: true, value: undefined });
  Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: jest.fn(() => Promise.resolve()) } });
  window.history.pushState({}, '', '/products/3');
  render(<App />);

  fireEvent.click(screen.getByRole('button', { name: /share/i }));
  expect(await screen.findByText(/link copied successfully/i)).toBeInTheDocument();
  expect(navigator.clipboard.writeText).toHaveBeenCalledWith(window.location.href);
});

test('View cart confirmation navigates to the cart page', () => {
  cleanup();
  window.history.pushState({}, '', '/products/3');
  render(<App />);
  fireEvent.click(screen.getByRole('button', { name: /add to cart/i }));
  fireEvent.click(screen.getByRole('link', { name: /view cart/i }));
  expect(screen.getByRole('heading', { name: 'Your cart.' })).toBeInTheDocument();
});

test('renders share and wishlist actions in the product header', () => {
  cleanup();
  window.history.pushState({}, '', '/products/3');
  render(<App />);
  const shareButton = screen.getByRole('button', { name: 'Share' });
  const wishlistButton = screen.getByRole('button', { name: /add wireless headphones to wishlist/i });
  expect(shareButton).toBeInTheDocument();
  expect(wishlistButton).toBeInTheDocument();
  expect(shareButton.closest('.product-detail__actions')).toBeNull();
  expect(wishlistButton.closest('.detail-actions')).not.toBeNull();
  expect(screen.getByRole('button', { name: /add wireless headphones to wishlist/i })).toBeInTheDocument();
});

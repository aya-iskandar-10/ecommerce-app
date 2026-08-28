import { createContext, useContext, useState } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  function addItem(product, variantId, selectedSize, selectedColor, selectedImage, price, quantity = 1) {
    setItems((currentItems) => {
      // Check for existing item with same product, variant, and size combination
      const existing = currentItems.find(
        (item) =>
          item.productId === product.id &&
          item.variantId === variantId &&
          item.selectedSize === selectedSize
      );

      if (existing) {
        return currentItems.map((item) =>
          item.productId === product.id && item.variantId === variantId && item.selectedSize === selectedSize
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      // Create new cart item with variant configuration
      return [
        ...currentItems,
        {
          cartItemId: Date.now(), // Unique ID for this cart item
          productId: product.id,
          productName: product.name,
          productBrand: product.brand,
          category: product.category,
          variantId,
          selectedColor,
          selectedSize,
          image: selectedImage,
          price,
          quantity,
        },
      ];
    });
  }

  function updateQuantity(cartItemId, quantity) {
    if (quantity < 1) return removeItem(cartItemId);
    setItems((currentItems) =>
      currentItems.map((item) => (item.cartItemId === cartItemId ? { ...item, quantity } : item))
    );
  }

  function removeItem(cartItemId) {
    setItems((currentItems) => currentItems.filter((item) => item.cartItemId !== cartItemId));
  }

  const value = {
    items,
    itemCount: items.reduce((total, item) => total + item.quantity, 0),
    subtotal: items.reduce((total, item) => total + item.price * item.quantity, 0),
    addItem,
    updateQuantity,
    removeItem,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const cart = useContext(CartContext);
  if (!cart) throw new Error('useCart must be used within CartProvider');
  return cart;
}

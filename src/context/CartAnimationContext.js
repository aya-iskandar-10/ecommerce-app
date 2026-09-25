import { createContext, useContext, useState } from 'react';

const CartAnimationContext = createContext(null);

export function CartAnimationProvider({ children }) {
  const [animations, setAnimations] = useState([]);

  function animateToCart(image, sourceElement) {
    const targetElement = document.querySelector('[data-cart-target]');
    if (!image || !sourceElement || !targetElement) return;

    const sourceRect = sourceElement.getBoundingClientRect();
    const targetRect = targetElement.getBoundingClientRect();
    const animation = {
      id: `${Date.now()}-${Math.random()}`,
      image,
      left: sourceRect.left + sourceRect.width / 2 - 36,
      top: sourceRect.top + sourceRect.height / 2 - 36,
      deltaX: targetRect.left + targetRect.width / 2 - (sourceRect.left + sourceRect.width / 2),
      deltaY: targetRect.top + targetRect.height / 2 - (sourceRect.top + sourceRect.height / 2),
    };

    setAnimations((current) => [...current, animation]);
  }

  function removeAnimation(animationId) {
    setAnimations((current) => current.filter((animation) => animation.id !== animationId));
  }

  return (
    <CartAnimationContext.Provider value={{ animateToCart }}>
      {children}
      <div className="cart-animation-layer" aria-hidden="true">
        {animations.map((animation) => (
          <img
            className="cart-animation"
            key={animation.id}
            src={animation.image}
            alt=""
            style={{
              left: animation.left,
              top: animation.top,
              '--cart-delta-x': `${animation.deltaX}px`,
              '--cart-delta-y': `${animation.deltaY}px`,
            }}
            onAnimationEnd={() => removeAnimation(animation.id)}
          />
        ))}
      </div>
    </CartAnimationContext.Provider>
  );
}

export function useCartAnimation() {
  const context = useContext(CartAnimationContext);
  if (!context) throw new Error('useCartAnimation must be used within CartAnimationProvider');
  return context;
}

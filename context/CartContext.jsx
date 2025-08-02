"use client";

import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product, variant, quantity) => {
    const size =
      variant.selectedOptions.find((opt) => opt.name.toLowerCase() === "talla")
        ?.value || "";
    const color =
      variant.selectedOptions.find((opt) => opt.name.toLowerCase() === "color")
        ?.value || "";

    // Busca si ya existe
    const existing = cartItems.find(
      (item) =>
        item.variantId === variant.id &&
        item.size === size &&
        item.color === color
    );

    if (existing) {
      setCartItems((prev) =>
        prev.map((item) =>
          item.variantId === variant.id &&
          item.size === size &&
          item.color === color
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      setCartItems((prev) => [
        ...prev,
        {
          variantId: variant.id,
          title: product.title,
          price: variant.price.amount,
          image: product.images.edges[0]?.node.url,
          size,
          color,
          quantity,
        },
      ]);
    }
  };

  const removeFromCart = (id, size, color) => {
    setCartItems((prev) =>
      prev.filter(
        (item) =>
          !(item.id === id && item.size === size && item.color === color)
      )
    );
  };

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);

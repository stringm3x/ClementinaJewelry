"use client";

import { useCart } from "@/context/CartContext";
import { X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function Cart({ isOpen, onClose }) {
  const { cartItems, removeFromCart } = useCart();
  const [loading, setLoading] = useState(false);

  async function handleCheckout() {
    setLoading(true);
    try {
      const lineItems = cartItems.map((item) => ({
        variantId: item.variantId,
        quantity: item.quantity,
      }));

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: lineItems }),
      });

      const data = await res.json();

      if (data.webUrl) {
        window.location.href = data.webUrl;
      } else {
        alert(data.error || "No se pudo crear el checkout. Intenta de nuevo.");
      }
    } catch (err) {
      alert("No se pudo crear el checkout. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className={`fixed top-0 right-0 pb-10 w-full sm:w-[400px] h-full bg-white shadow-xl transition-transform duration-300 z-50 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-xl font-semibold">Tu carrito</h2>
        <button onClick={onClose}>
          <X className="w-5 h-5" />
        </button>
      </div>

      {cartItems.length === 0 ? (
        <div className="p-6 text-center text-zinc">El carrito está vacío</div>
      ) : (
        <div className="p-4 flex flex-col gap-6 overflow-y-auto h-[calc(100%-120px)]">
          {cartItems.map((item, index) => (
            <div key={index} className="flex gap-4 border-b pb-4">
              <div className="relative w-20 h-20">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover rounded"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-sm">{item.title}</h3>
                <p className="text-sm text-zinc">Talla: {item.size}</p>
                <p className="text-sm text-zinc">Color: {item.color}</p>
                <p className="text-sm font-semibold">${item.price} mx</p>
                <p className="text-xs">Cantidad: {item.quantity}</p>
              </div>
              <button
                onClick={() =>
                  removeFromCart(item.variantId, item.size, item.color)
                }
                className="text-sm text-red"
              >
                Quitar
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="p-4 border-t">
        <button
          className="w-full bg-black text-white py-3 rounded-full hover:bg-gray transition"
          onClick={handleCheckout}
          disabled={cartItems.length === 0 || loading}
        >
          {loading ? "Redirigiendo..." : "Ir al checkout"}
        </button>
      </div>
    </div>
  );
}

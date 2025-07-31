"use client";

import Image from "next/image";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

export default function ProductDetails({ product }) {
  const images = product.images.edges;
  const price = product.variants.edges[0]?.node?.price.amount;

  const { addToCart } = useCart();

  const [selectedSize, setSelectedSize] = useState("7");
  const [selectedColor, setSelectedColor] = useState("Plateado");
  const [quantity, setQuantity] = useState(1);

  const sizes = ["7", "9", "11"];
  const colors = [
    { name: "Plateado", color: "#d4d4d4" },
    { name: "Coral", color: "#b08b78" },
    { name: "Dorado", color: "#f1c867" },
  ];

  return (
    <section className="sm:h-screen grid grid-cols-1 md:grid-cols-2 gap-10 p-5 sm:p-10 items-center">
      {/* Galería */}
      <div className="flex flex-col gap-4">
        <div className="relative aspect-square w-full">
          <Image
            src={images[0].node.url}
            alt={product.title}
            fill
            className="object-cover rounded-xl"
          />
        </div>
      </div>

      {/* Detalles */}
      <div className="flex flex-col gap-5">
        <h1 className="text-4xl lg:text-5xl font-semibold">{product.title}</h1>
        <p className="text-zinc text-md lg:text-xl">Base Acero Inoxidable Ajustable</p>
        <p className="text-3xl lg:text-4xl font-bold">${price}mx</p>

        {/* Tallas */}
        <div>
          <p className="text-lg font-medium mb-1">Tallas:</p>
          <div className="flex gap-4">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-3 py-1 border rounded ${
                  selectedSize === size
                    ? "bg-black text-white"
                    : "text-black border-gray"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
          <p className="text-md mt-2 text-zinc underline cursor-pointer">
            Guía de tallas &gt;
          </p>
        </div>

        {/* Colores */}
        <div>
          <p className="text-lg font-medium mb-1">Color:</p>
          <div className="flex gap-6">
            {colors.map((color) => (
              <div
                key={color.name}
                className="flex flex-col items-center gap-1"
              >
                <button
                  onClick={() => setSelectedColor(color.name)}
                  className={`w-8 h-8 rounded-full border-2 ${
                    selectedColor === color.name
                      ? "border-black"
                      : "border-transparent"
                  }`}
                  style={{ backgroundColor: color.color }}
                />
                <p className="text-xs">{color.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Cantidad */}
        <div className="flex items-center gap-4 mt-4">
          <button
            className="border px-2 py-1 text-lg"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
          >
            -
          </button>
          <span>{quantity}</span>
          <button
            className="border px-2 py-1 text-lg"
            onClick={() => setQuantity(quantity + 1)}
          >
            +
          </button>
        </div>

        {/* Agregar al carrito */}
        <button
          onClick={() =>
            addToCart(product, selectedSize, selectedColor, quantity)
          }
          className="mt-6 bg-black text-white px-6 py-3 rounded-full text-sm hover:bg-gray-800 transition w-full"
        >
          AGREGAR AL CARRITO
        </button>
      </div>
    </section>
  );
}

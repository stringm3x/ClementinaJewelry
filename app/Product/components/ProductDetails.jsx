"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";

// Auxiliares
function getUniqueOptions(variants, optionName) {
  const set = new Set();
  variants.forEach(({ node }) => {
    if (!Array.isArray(node.selectedOptions)) return;
    const option = node.selectedOptions.find(
      (opt) => opt.name.toLowerCase() === optionName.toLowerCase()
    );
    if (option) set.add(option.value);
  });
  return Array.from(set);
}

function getAvailableColorsForSize(variants, size) {
  const set = new Set();
  variants.forEach(({ node }) => {
    if (!Array.isArray(node.selectedOptions)) return;
    const talla = node.selectedOptions.find(
      (opt) => opt.name.toLowerCase() === "talla"
    );
    const color = node.selectedOptions.find(
      (opt) => opt.name.toLowerCase() === "color"
    );
    if (talla && talla.value === size && color && node.availableForSale) {
      set.add(color.value);
    }
  });
  return Array.from(set);
}

function findVariant(variants, size, color) {
  return (
    variants.find(
      ({ node }) =>
        Array.isArray(node.selectedOptions) &&
        node.selectedOptions.some(
          (opt) => opt.name.toLowerCase() === "talla" && opt.value === size
        ) &&
        node.selectedOptions.some(
          (opt) => opt.name.toLowerCase() === "color" && opt.value === color
        )
    )?.node || null
  );
}

function useIsLoggedIn() {
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    setLoggedIn(!!localStorage.getItem("customerToken"));
  }, []);
  return loggedIn;
}

export default function ProductDetails({ product }) {
  const images = product.images.edges;
  const variants = product.variants.edges;

  const sizes = getUniqueOptions(variants, "Talla");
  const colors = getUniqueOptions(variants, "Color");

  // Si solo hay una talla y es "Ajustable"
  const autoTalla =
    sizes.length === 1 && sizes[0].toLowerCase() === "ajustable"
      ? sizes[0]
      : sizes[0] || "";

  const [selectedSize, setSelectedSize] = useState(autoTalla);
  const [selectedColor, setSelectedColor] = useState(colors[0] || "");
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCart();
  const loggedIn = useIsLoggedIn();

  // Solo mostrar las combinaciones realmente disponibles
  const colorsAvailable = getAvailableColorsForSize(variants, selectedSize);

  // Encuentra variante exacta seleccionada
  const selectedVariant = findVariant(variants, selectedSize, selectedColor);
  const price = selectedVariant?.price?.amount || "";
  const compareAtPrice = selectedVariant?.compareAtPrice?.amount || "";
  const showDiscount = compareAtPrice && compareAtPrice !== price;

  // Nuevo: obtener stock disponible
  const stockDisponible = selectedVariant?.quantityAvailable ?? 0;
  const inStock = selectedVariant?.availableForSale && stockDisponible > 0;

  // Imagen principal según color
  const mainImage =
    images.find(
      (img) =>
        img.node.altText &&
        img.node.altText.toLowerCase().includes(selectedColor.toLowerCase())
    ) || images[0];

  const colorHasImage = images.some(
    (img) =>
      img.node.altText &&
      img.node.altText.toLowerCase().includes(selectedColor.toLowerCase())
  );

  function handleSetQuantity(newQty) {
    if (newQty < 1) return;
    if (newQty > stockDisponible) return;
    setQuantity(newQty);
  }

  return (
    <section className="sm:h-screen grid grid-cols-1 md:grid-cols-2 gap-10 p-5 sm:p-10 items-center">
      {/* Galería */}
      <div className="flex flex-col gap-4">
        <div className="relative aspect-square w-full">
          <Image
            src={mainImage.node.url}
            alt={product.title}
            fill
            className="object-cover rounded-xl"
            priority
          />
          {!colorHasImage && (
            <span className="absolute bottom-2 left-2 text-xs bg-white/80 px-2 py-1 rounded">
              No hay imagen específica para "{selectedColor}", se muestra la
              principal.
            </span>
          )}
        </div>
      </div>

      {/* Detalles */}
      <div className="flex flex-col gap-5">
        <h1 className="text-4xl lg:text-5xl font-semibold">{product.title}</h1>
        <p className="text-zinc text-lg lg:text-2xl">{product.description}</p>
        <p className="text-3xl md:text-4xl font-bold">${price}mx</p>
        {showDiscount && (
          <p className="text-xl line-through text-zinc font-normal mb-1">
            ${compareAtPrice}mx
          </p>
        )}
        {sizes.length > 1 ||
        (sizes.length === 1 && sizes[0].toLowerCase() !== "ajustable") ? (
          <div>
            <p className="text-lg font-medium mb-1">Tallas:</p>
            <div className="flex gap-4">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => {
                    setSelectedSize(size);
                    setQuantity(1); // Reset cantidad al cambiar talla
                  }}
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
          </div>
        ) : null}

        {/* Colores */}
        <div>
          <p className="text-lg font-medium mb-1">Color:</p>
          <div className="flex gap-6">
            {colors.map((colorName) => (
              <div key={colorName} className="flex flex-col items-center gap-1">
                <button
                  onClick={() => {
                    setSelectedColor(colorName);
                    setQuantity(1);
                  }}
                  disabled={!colorsAvailable.includes(colorName)}
                  className={`w-8 h-8 rounded-full border-2 ${
                    selectedColor === colorName
                      ? "border-black"
                      : !colorsAvailable.includes(colorName)
                      ? "opacity-40"
                      : "border-white"
                  }`}
                  style={{
                    backgroundColor:
                      colorName.toLowerCase() === "plateado"
                        ? "#d4d4d4"
                        : colorName.toLowerCase() === "dorado"
                        ? "#f1c867"
                        : colorName.toLowerCase() === "rosa"
                        ? "#ff0080"
                        : colorName.toLowerCase() === "azul"
                        ? "#008bff"
                        : colorName.toLowerCase() === "verde"
                        ? "#00913f"
                        : "#fff",
                  }}
                  title={colorName}
                />
                <p className="text-xs">{colorName}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Cantidad */}
        <div className="flex items-center gap-4 mt-4">
          <button
            className="border px-2 py-1 text-lg"
            onClick={() => handleSetQuantity(quantity - 1)}
            disabled={!inStock || quantity <= 1}
          >
            -
          </button>
          <span>{quantity}</span>
          <button
            className="border px-2 py-1 text-lg"
            onClick={() => handleSetQuantity(quantity + 1)}
            disabled={!inStock || quantity >= stockDisponible}
          >
            +
          </button>
        </div>
        {stockDisponible > 0 && (
          <p className="text-xs text-zinc">
            Stock disponible: {stockDisponible}
          </p>
        )}
        {quantity >= stockDisponible && stockDisponible > 0 && (
          <p className="text-red text-xs mt-1">
            No puedes agregar más de {stockDisponible} piezas disponibles.
          </p>
        )}

        {!inStock && (
          <p className="text-red text-lg font-medium mt-2">
            No hay productos disponibles para esta combinación.
          </p>
        )}

        {/* Agregar al carrito */}
        <button
          onClick={() => {
            if (!loggedIn) {
              alert("Debes iniciar sesión para agregar productos al carrito.");
              return;
            }
            if (quantity > stockDisponible) {
              alert(`Solo hay ${stockDisponible} piezas disponibles.`);
              return;
            }
            addToCart(product, selectedVariant, quantity);
          }}
          disabled={!inStock || !loggedIn}
          className={`mt-6 bg-black text-white px-6 py-3 rounded-full text-sm hover:bg-gray-800 transition w-full ${
            !inStock || !loggedIn ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loggedIn ? "AGREGAR AL CARRITO" : "INICIA SESIÓN PARA COMPRAR"}
        </button>
      </div>
    </section>
  );
}

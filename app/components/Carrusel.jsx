"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "./ProductCard";

export default function Carrusel({ products }) {
  const scrollRef = useRef();

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -400 : 400,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => scroll("left")}
        className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow hover:bg-black hover:text-white transition"
      >
        <ChevronLeft />
      </button>
      <button
        onClick={() => scroll("right")}
        className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow hover:bg-black hover:text-white transition"
      >
        <ChevronRight />
      </button>

      <div
        ref={scrollRef}
        className="
          flex gap-10 
          overflow-x-auto 
          no-scrollbar 
          scroll-smooth 
          py-2
          sm:overflow-x-hidden
        "
        style={{ scrollBehavior: "smooth" }}
      >
        {products.map((product) => (
          <div key={product.id} className="flex-shrink-0 w-[250px]">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}

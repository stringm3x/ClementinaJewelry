"use client";

import Image from "next/image";
import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

const cards = [
  {
    id: "1",
    title: "Aretes",
    href: "/Earrings",
    img: "/products/aretes.jpg",
  },
  {
    id: "2",
    title: "Pulseras",
    href: "/Bracelets",
    img: "/products/pulseras.jpg",
  },
  {
    id: "3",
    title: "Collares",
    href: "/Necklaces",
    img: "/products/collares.jpg",
  },
  {
    id: "4",
    title: "Anillos",
    href: "/Rings",
    img: "/products/anillos.jpg",
  },
  {
    id: "5",
    title: "Relojes",
    href: "/Clock",
    img: "/products/relojes.jpg",
  },
];

const Products = () => {
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
    <section className="relative px-2 sm:px-5 lg:px-10 py-10">
      {/* Flechas */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow hover:bg-black hover:text-white transition"
      >
        <ChevronLeft />
      </button>
      <button
        onClick={() => scroll("right")}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow hover:bg-black hover:text-white transition"
      >
        <ChevronRight />
      </button>

      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-hidden no-scrollbar scroll-smooth"
      >
        {cards.map((item) => (
          <div
            key={item.id}
            className="relative w-[350px] h-80 rounded-2xl flex-shrink-0 group"
          >
            <Image
              src={item.img}
              alt={item.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-end items-center p-6 gap-2 text-center">
              <h1 className="text-white text-3xl">{item.title}</h1>
              <Link href={item.href}>
                <button className="bg-white hover:bg-black text-black hover:text-white px-6 py-2 rounded-full text-sm font-semibold">
                  Ver más
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Products;

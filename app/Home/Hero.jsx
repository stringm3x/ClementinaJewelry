"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

const images = [
  "/hero.jpg",
  "/hero2.jpg",
  "/hero3.jpg",
  "/hero4.jpg",
];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen relative flex flex-col justify-center p-4 sm:p-10">
      {images.map((src, idx) => (
        <Image
          key={src}
          src={src}
          alt="Hero"
          fill
          priority={idx === current}
          className={`absolute object-cover transition-opacity duration-1000 ${
            idx === current ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* Overlay opcional para texto */}
      {/* <div className="relative z-10 flex flex-col text-white">
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold">NUESTROS MEJORES DESCUENTOS</h1>
        <h1 className="text-lg sm:text-2xl lg:text-3xl">ESTÁN AQUÍ PARA TI</h1>
      </div> */}
    </div>
  );
};

export default Hero;

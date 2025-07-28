import React from "react";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="min-h-screen relative flex flex-col justify-center p-10">
      <Image
        src="/hero.jpg"
        alt="hero"
        fill
        className="absolute object-cover"
      />

      <div className="relative flex flex-col text-white">
        <h1 className="text-5xl font-bold">NUESTROS MEJORES DESCUENTOS</h1>
        <h1 className="text-3xl">ESTÁN AQUÍ PARA TI</h1>
      </div>
    </div>
  );
};

export default Hero;

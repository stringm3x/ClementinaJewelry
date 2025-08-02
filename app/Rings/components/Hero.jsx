import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <div className="relative h-screen  content-center p-20">
      <Image
        src="/Hero/rings.jpg"
        fill
        alt="hero"
        className="object-cover absolute"
      />
    </div>
  );
};

export default Hero;
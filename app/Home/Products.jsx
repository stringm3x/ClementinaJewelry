import Image from "next/image";
import React from "react";

const cards = [
  {
    id: "1",
    title: "Aretes",
    href: "",
    img: "/collares.jpg",
  },
  {
    id: "2",
    title: "Pulseras",
    href: "",
    img: "/collares.jpg",
  },
  {
    id: "3",
    title: "Collares",
    href: "",
    img: "/collares.jpg",
  },
  {
    id: "4",
    title: "Anillos",
    href: "",
    img: "/collares.jpg",
  },
];

const Products = () => {
  return (
    <section className="px-10 py-5 flex flex-row gap-5">
      {cards.map((item) => (
        <div
          key={item.id}
          className="relative bg-black w-[350px] h-80 rounded-2xl p-10 content-end justify-items-center"
        >
          <Image
            src={item.img}
            fill
            alt=""
            className="absolute object-cover rounded-2xl"
          />

          <div className="relative flex flex-col gap-2 text-center">
            <h1 className="text-white text-3xl font-medium">{item.title}</h1>
            <button className="bg-bg text-white px-6 py-2 rounded-full">
              Ver mas
            </button>
          </div>
        </div>
      ))}
    </section>
  );
};
export default Products;

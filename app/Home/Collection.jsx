import React from "react";
import Hero from "./Hero";
import Image from "next/image";

const collections = [
  {
    id: "1",
    title: "Moissanita",
    href: "/",
    img: "/collections/moissanita.jpeg",
  },
  {
    id: "2",
    title: "Plata Ley",
    href: "/",
    img: "/collections/plataley.jpeg",
  },
  {
    id: "3",
    title: "Perla cultivada",
    href: "/",
    img: "/collections/perla.jpeg",
  },
];

const Collection = () => {
  return (
    <section className="h-screen flex flex-col gap-10 items-center p-20">
      <div className="text-center">
        <h1 className="text-4xl">NUEVA COLECCIÓN</h1>
        <h1 className="text-5xl font-bold">SUMMER</h1>
      </div>

      <div className="flex flex-row gap-10">
        {collections.map((items) => (
          <div
            key={items.id}
            className="relative h-72 w-[350px] rounded-2xl content-end p-8"
          >
            <Image
              src={items.img}
              alt={items.title}
              fill
              className="absolute object-cover rounded-2xl"
            />

            <div className="relative justify-items-center text-center text-white">
              <h1 className="text-2xl">{items.title}</h1>
              <button className="text-gray">Ver Coleccion</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Collection;

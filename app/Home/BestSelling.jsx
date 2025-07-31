import { getAllProducts } from "@/lib/shopify";
import Carrusel from "../components/Carrusel";

export default async function BestSelling() {
  const products = await getAllProducts();

  return (
    <section className="flex flex-col gap-14 p-10 lg:p-20">
      <h1 className="text-3xl sm:text-5xl">LO MÁS VENDIDO</h1>
      <Carrusel products={products} />
    </section>
  );
}

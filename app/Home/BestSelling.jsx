import { getCollectionProducts } from "@/lib/shopify";
import Carrusel from "../components/Carrusel";

export default async function BestSelling() {
  const products = await getCollectionProducts("lo-mas-vendido");

  return (
    <section className="flex flex-col gap-14 px-5 py-10 lg:py-20">
      <h1 className="text-5xl mb-6">Lo Más Vendido</h1>
      <Carrusel products={products} />
    </section>
  );
}

import { getCollectionProducts } from "@/lib/shopify";
import CategorySection from "../components/CategorySection";
import Carrusel from "../components/Carrusel";

export default async function BestSelling() {
  const products = await getCollectionProducts("Best");

  return (
    <section className="flex flex-col gap-14 p-10 lg:p-20">
      <CategorySection title="Lo Más Vendido" products={products} />
    </section>
  );
}

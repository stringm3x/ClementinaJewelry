import { getCollectionProducts } from "@/lib/shopify";
import CategorySection from "../components/CategorySection";
import Hero from "./components/Hero";

export default async function BraceletsPage() {
  const products = await getCollectionProducts("pulseras");
  return (
    <div>
      <Hero />
      <CategorySection title="Pulseras" products={products} />
    </div>
  );
}

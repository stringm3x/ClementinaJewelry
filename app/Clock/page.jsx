import { getCollectionProducts } from "@/lib/shopify";
import CategorySection from "../components/CategorySection";
import Hero from "./components/Hero";

export default async function BraceletsPage() {
  const products = await getCollectionProducts("relojes");
  return (
    <div>
      <Hero />
      <CategorySection title="Relojes" products={products} />
    </div>
  );
}

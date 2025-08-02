import { getCollectionProducts } from "@/lib/shopify";
import CategorySection from "../components/CategorySection";
import Hero from "./components/Hero";

export default async function EarringsPage() {
  const products = await getCollectionProducts("Aretes");
  return (
    <div>
      <Hero />
      <CategorySection title="Aretes" products={products} />;
    </div>
  );
}

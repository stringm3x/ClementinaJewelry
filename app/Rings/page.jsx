import { getCollectionProducts } from "@/lib/shopify";
import CategorySection from "../components/CategorySection";
import Hero from "./components/Hero";

export default async function RingsPage() {
  const products = await getCollectionProducts("anillos");
  return (
    <div>
      <Hero />
      <CategorySection title="Anillos" products={products} />;
    </div>
  );
}

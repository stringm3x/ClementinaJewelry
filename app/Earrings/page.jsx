import { getCollectionProducts } from "@/lib/shopify";
import CategorySection from "../components/CategorySection";

export default async function EarringsPage() {
  const products = await getCollectionProducts("Aretes");
  console.log("Productos encontrados:", products);
  return <CategorySection title="Aretes" products={products} />;
}

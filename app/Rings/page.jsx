import { getCollectionProducts } from "@/lib/shopify";
import CategorySection from "../components/CategorySection";

export default async function RingsPage() {
  const products = await getCollectionProducts("anillos");
  return <CategorySection title="Anillos" products={products} />;
}
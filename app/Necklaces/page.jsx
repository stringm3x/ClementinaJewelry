import { getCollectionProducts } from "@/lib/shopify";
import CategorySection from "../components/CategorySection";

export default async function NecklacesPage() {
  const products = await getCollectionProducts("collares");
  return <CategorySection title="Collares" products={products} />;
}

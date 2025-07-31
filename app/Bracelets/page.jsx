import { getCollectionProducts } from "@/lib/shopify";
import CategorySection from "../components/CategorySection";

export default async function BraceletsPage() {
  const products = await getCollectionProducts("pulseras");
  return <CategorySection title="Pulseras" products={products} />;
}

import { getCollectionProducts } from "@/lib/shopify";
import CategorySection from "../components/CategorySection";
import Image from "next/image";
import Hero from "./components/Hero";

export default async function NecklacesPage() {
  const products = await getCollectionProducts("collares");

  return (
    <div>
      <Hero />
      {/* LISTADO */}
      <CategorySection title="Collares" products={products} />
    </div>
  );
}

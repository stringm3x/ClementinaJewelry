import { getAllProducts } from "@/lib/shopify";
import Hero from "./Home/Hero";
import Products from "./Home/Products";
import Collection from "./Home/Collection";
import BestSelling from "./Home/BestSelling";

export default async function HomePage() {
  const products = await getAllProducts();

  console.log(products); // Solo para verificar en consola

  return (
    <main className="overflow-hidden">
      <Hero />
      <Products />
      <Collection />
      <BestSelling />
    </main>
  );
}

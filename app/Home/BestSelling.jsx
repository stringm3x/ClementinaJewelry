import { getAllProducts } from "@/lib/shopify";
import ProductCard from "../components/ProductCard";

export default async function BestSelling() {
  const products = await getAllProducts();

  return (
    <section className="grid grid-cols-2 md:grid-cols-3 p-10">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  );
}

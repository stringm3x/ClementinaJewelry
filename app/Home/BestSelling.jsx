import { getAllProducts } from "@/lib/shopify";
import ProductCard from "../components/ProductCard";

export default async function BestSelling() {
  const products = await getAllProducts();

  return (
    <section className="flex flex-col gap-10 p-10">
      <h1 className="text-5xl">LO MÁS VENDIDO</h1>

      <div className="grid grid-cols-2 md:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

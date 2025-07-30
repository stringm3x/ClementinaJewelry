import { getProductByHandle } from "@/lib/shopify";
import ProductDetails from "../components/ProductDetails";

export default async function ProductPage({ params }) {
  const product = await getProductByHandle(params.handle);

  if (!product) {
    return <div className="p-10">Producto no encontrado</div>;
  }

  return (
    <div className="p-10">
      <ProductDetails product={product} />
    </div>
  );
}

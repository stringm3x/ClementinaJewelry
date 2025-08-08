import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ product }) {
  const image = product.images.edges[0]?.node;
  const variant = product.variants.edges[0]?.node;
  const price = variant?.price.amount;
  const compareAt = variant?.compareAtPrice?.amount;

  const hasDiscount = compareAt && compareAt > price;
  const discountPercent = hasDiscount
    ? Math.round(((compareAt - price) / compareAt) * 100)
    : 0;

  return (
    <Link href={`/Product/${product.handle}`}>
      <div className="w-[200px] xl:w-[270px] h-64 flex flex-col gap-2">
        {/* Imagen */}
        <div className="aspect-square w-3/4 overflow-hidden rounded-md">
          <img
            src={image?.url}
            alt={image?.altText || product.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Título */}
        <h3 className="text-lg font-semibold tracking-wide uppercase">
          {product.title}
        </h3>

        {/* Precio anterior */}
        {hasDiscount && (
          <p className="text-md text-zinc line-through">${compareAt}mx</p>
        )}

        {/* Precio actual */}
        <p className="text-2xl font-medium">${price}mx</p>

        {/* Descuento abajo */}
        {hasDiscount && (
          <p className="text-sm text-green font-bold">
            -{discountPercent}% de descuento
          </p>
        )}
      </div>
    </Link>
  );
}

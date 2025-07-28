import Image from "next/image";

export default function ProductCard({ product }) {
  const image = product.images.edges[0]?.node;

  return (
    <div className="w-[270px] h-72 flex flex-col gap-2">
      {/* Imagen */}
      <div className="aspect-square w-full overflow-hidden rounded-md">
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

      {/* Subtítulo (puedes extraerlo desde una metafield si lo configuras en Shopify) */}
      <p className="text-md text-zinc">Base de Acero inoxidable</p>

      {/* Precio */}
      <p className="text-2xl font-medium">
        ${product.variants.edges[0].node.price.amount}mx
      </p>
    </div>
  );
}

import ProductCard from "./ProductCard";

export default function CategorySection({ title, products }) {
  return (
    <section className="flex flex-col gap-10 p-10 md:p-14 sm:p-20">
      <h1 className="text-3xl sm:text-6xl uppercase">{title}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-7 justify-items-center">
        {products.length === 0 ? (
          <p className="col-span-full text-center text-zinc">
            No hay productos en esta categoría.
          </p>
        ) : (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>
    </section>
  );
}

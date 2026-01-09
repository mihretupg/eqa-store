import { Link } from "react-router-dom"
import products from "../data/products"

export default function Categories() {
  const categories = Array.from(
    products.reduce((map, product) => {
      if (!map.has(product.category)) {
        map.set(product.category, product.image)
      }
      return map
    }, new Map<string, string>())
  ).map(([name, image]) => ({ name, image }))

  return (
    <section className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold">Categories</h1>
      <p className="text-gray-600 mt-2">
        Browse collections by category.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => (
          <Link
            key={category.name}
            to={`/products?q=${encodeURIComponent(category.name)}`}
            className="card-shell"
          >
            <img
              src={category.image}
              alt={category.name}
              className="card-image h-36"
            />
            <h2 className="mt-4 text-lg font-semibold text-gray-900">
              {category.name}
            </h2>
            <span className="mt-2 inline-flex text-sm font-semibold text-[color:var(--primary)]">
              Shop {category.name.toLowerCase()}
            </span>
          </Link>
        ))}
      </div>

      <Link to="/products" className="inline-block mt-8 text-[color:var(--primary)] hover:underline">
        View all products
      </Link>
    </section>
  )
}

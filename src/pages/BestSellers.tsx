import { Link } from "react-router-dom"
import products from "../data/products"
import ProductCard from "../components/ProductCard"

export default function BestSellers() {
  const bestSellers = products.slice(0, 4)

  return (
    <section className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold">Best Sellers</h1>
      <p className="text-gray-600 mt-2">
        Customer favorites, ranked by popularity.
      </p>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {bestSellers.map((product) => (
          <div key={product.id} className="card-shell">
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-[color:var(--secondary-soft)] px-2 py-1 text-xs font-semibold text-[color:var(--secondary-dark)]">
                Top pick
              </span>
            </div>
            <div className="mt-4">
              <ProductCard product={product} />
            </div>
          </div>
        ))}
      </div>

      <Link to="/products" className="inline-block mt-8 text-[color:var(--primary)] hover:underline">
        Shop best sellers
      </Link>
    </section>
  )
}

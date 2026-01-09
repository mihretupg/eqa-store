import products from "../data/products"
import ProductCard from "../components/ProductCard"
import { Link } from "react-router-dom"

export default function Home() {
  const featured = products.slice(0, 4)

  return (
    <section className="max-w-7xl mx-auto p-6">
      <div className="rounded-2xl border bg-white p-6">
        <h1 className="text-3xl font-bold">Eqa</h1>
        <p className="text-gray-600 mt-2 max-w-2xl">
          Simple shopping. Clean UI. Fast experience.
        </p>

        <div className="mt-4">
          <Link
            to="/products"
            className="inline-flex items-center justify-center rounded-lg bg-gray-900 text-white px-4 py-2 text-sm font-medium hover:bg-black"
          >
            Shop Now
          </Link>
        </div>
      </div>

      <div className="mt-10 flex items-end justify-between">
        <h2 className="text-2xl font-bold">Featured</h2>
        <Link to="/products" className="text-sm text-blue-600 hover:underline">
          View all
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {featured.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  )
}

import { Link } from "react-router-dom"
import products from "../data/products"
import ProductCard from "../components/ProductCard"

export default function NewArrivals() {
  const arrivals = products.slice(-4)

  return (
    <section className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold">New Arrivals</h1>
      <p className="text-gray-600 mt-2">
        Fresh picks added this week.
      </p>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {arrivals.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <Link to="/products" className="inline-block mt-8 text-[color:var(--primary)] hover:underline">
        Explore all products
      </Link>
    </section>
  )
}

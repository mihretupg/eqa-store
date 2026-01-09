import { Link, useParams } from "react-router-dom"
import products from "../data/products"

export default function ProductDetails() {
  const { id } = useParams()
  const product = products.find((p) => p.id === id)

  if (!product) {
    return (
      <section className="max-w-7xl mx-auto p-6">
        <h1 className="text-2xl font-bold">Product not found</h1>
        <Link to="/products" className="inline-block mt-4 text-blue-600 hover:underline">
          Back to products
        </Link>
      </section>
    )
  }

  return (
    <section className="max-w-7xl mx-auto p-6">
      <Link to="/products" className="text-sm text-blue-600 hover:underline">
        ← Back to products
      </Link>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="border rounded-2xl overflow-hidden bg-white">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-[360px] object-cover"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-gray-500 mt-2">{product.category}</p>

          <p className="text-2xl font-bold mt-4">
            ${product.price.toFixed(2)}
          </p>

          <p className="text-gray-700 mt-4 leading-relaxed">
            {product.description}
          </p>

          <button
            className="mt-6 w-full md:w-auto rounded-lg bg-gray-900 text-white px-6 py-3 text-sm font-medium hover:bg-black"
            onClick={() => alert("Cart coming in Lesson 3")}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </section>
  )
}

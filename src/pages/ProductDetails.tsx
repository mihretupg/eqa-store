import { Link, useParams } from "react-router-dom"
import products from "../data/products"
import { useCart } from "../context/CartContext"

export default function ProductDetails() {
  const { id } = useParams()
  const product = products.find((p) => p.id === id)
  const { addToCart } = useCart()

  if (!product) {
    return (
      <section className="max-w-7xl mx-auto p-6">
        <h1 className="text-2xl font-bold">Product not found</h1>
        <Link to="/products" className="inline-block mt-4 text-[color:var(--primary)] hover:underline">
          Back to products
        </Link>
      </section>
    )
  }

  return (
    <section className="max-w-7xl mx-auto p-6">
      <Link to="/products" className="text-sm text-[color:var(--primary)] hover:underline">
        ← Back to products
      </Link>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="card-shell">
          <img
            src={product.image}
            alt={product.name}
            className="card-image h-[360px]"
          />
        </div>

        <div className="p-2">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-gray-500 mt-2">{product.category}</p>

          <p className="text-2xl font-bold mt-4">
            ${product.price.toFixed(2)}
          </p>

          <p className="text-gray-700 mt-4 leading-relaxed">
            {product.description}
          </p>

          <button
            className="mt-4 inline-flex items-center justify-center rounded-md p-2 text-[color:var(--primary)] transition hover:text-[color:var(--primary-dark)]"
            onClick={() => addToCart(product)}
            aria-label="Add to cart"
            title="Add to cart"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-6 w-6 transition group-hover:scale-105"
              aria-hidden="true"
            >
              <path d="M7 4a1 1 0 0 0-1 1v1H3a1 1 0 1 0 0 2h1.2l1.5 8.4A3 3 0 0 0 8.7 19h7.6a3 3 0 0 0 3-2.4l1.3-7.6A1 1 0 0 0 19.6 8H7.3l-.3-2H7Z" />
              <path d="M9 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm8 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}


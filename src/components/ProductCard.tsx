import { Link } from "react-router-dom"
import { useCart } from "../context/CartContext"

type Product = {
  id: string
  image: string
  name: string
  category?: string
  price: number
}

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart()

  return (
    <div className="card-shell">
      <Link to={`/products/${product.id}`} className="block">
        <img
          src={product.image}
          alt={product.name}
          className="card-image h-48"
          loading="lazy"
        />
      </Link>

      <div className="pt-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <Link to={`/products/${product.id}`}>
              <h3 className="font-semibold text-gray-900">
                {product.name}
              </h3>
            </Link>
            <p className="text-sm text-gray-500">{product.category}</p>
          </div>

          <p className="font-semibold text-gray-900">
            ${product.price.toFixed(2)}
          </p>
        </div>

        <button
          className="mt-3 inline-flex items-center justify-center rounded-md p-2 text-[color:var(--primary)] transition hover:text-[color:var(--primary-dark)]"
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
  )
}


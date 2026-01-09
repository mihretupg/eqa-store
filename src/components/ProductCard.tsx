import { Link } from "react-router-dom"
import { useCart } from "../context/CartContext"

type Product = {
  id: string | number
  image: string
  name: string
  category?: string
  price: number
}

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart()

  return (
    <div className="border rounded-xl overflow-hidden bg-white hover:shadow-lg transition">
      <Link to={`/products/${product.id}`} className="block">
        <img
          src={product.image}
          alt={product.name}
          className="h-48 w-full object-cover"
          loading="lazy"
        />
      </Link>

      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <Link to={`/products/${product.id}`}>
              <h3 className="font-semibold text-gray-900 hover:underline">
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
          className="mt-4 w-full rounded-lg bg-gray-900 text-white py-2 text-sm font-medium hover:bg-black"
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
}

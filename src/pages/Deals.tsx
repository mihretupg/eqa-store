import { Link } from "react-router-dom"
import products from "../data/products"
import { useCart } from "../context/CartContext"

export default function Deals() {
  const { addToCart } = useCart()
  const deals = products.map((product, index) => {
    const percent = 10 + (index % 4) * 5
    const original = product.price * (1 + percent / 100)
    return {
      ...product,
      percent,
      original,
    }
  })

  return (
    <section className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold">Deals</h1>
      <p className="text-gray-600 mt-2">
        Limited-time offers curated for you.
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {deals.map((deal) => (
          <div key={deal.id} className="card-shell">
            <Link to={`/products/${deal.id}`} className="block">
              <img
                src={deal.image}
                alt={deal.name}
                className="card-image h-48"
                loading="lazy"
              />
            </Link>

            <div className="pt-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <Link to={`/products/${deal.id}`}>
                    <h2 className="text-lg font-semibold text-gray-900">
                      {deal.name}
                    </h2>
                  </Link>
                  <p className="text-sm text-gray-500">{deal.category}</p>
                </div>
                <span className="rounded-full bg-[color:var(--secondary-soft)] px-2 py-1 text-xs font-semibold text-[color:var(--secondary-dark)]">
                  -{deal.percent}%
                </span>
              </div>

              <div className="mt-3 flex items-center justify-between gap-3">
                <div className="flex items-end gap-2">
                  <span className="text-lg font-bold text-gray-900">
                    ${deal.price.toFixed(2)}
                  </span>
                  <span className="text-sm text-gray-400 line-through">
                    ${deal.original.toFixed(2)}
                  </span>
                </div>
                <button
                  className="inline-flex items-center justify-center rounded-md p-2 text-[color:var(--primary)] transition hover:text-[color:var(--primary-dark)]"
                  onClick={() => addToCart(deal)}
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
          </div>
        ))}
      </div>

      <Link to="/products" className="inline-block mt-8 text-[color:var(--primary)] hover:underline">
        Shop all products
      </Link>
    </section>
  )
}

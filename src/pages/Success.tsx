import { Link } from "react-router-dom"

export default function Success() {
  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 py-16 text-center">
      <div className="border rounded-2xl bg-white p-8">
        <h1 className="text-3xl font-bold">Order Successful 🎉</h1>
        <p className="text-gray-600 mt-4">
          Thank you for your purchase. Your order has been placed successfully.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/orders"
            className="rounded-lg bg-[color:var(--primary)] text-white px-6 py-3 text-sm font-medium hover:bg-[color:var(--primary-dark)]"
          >
            View Orders
          </Link>

          <Link
            to="/products"
            className="rounded-lg border px-6 py-3 text-sm font-medium hover:bg-gray-50"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </section>
  )
}


import { Link } from "react-router-dom"
import { useCart } from "../context/CartContext"
import { formatMoney } from "../utils/money"
import { calcTotals } from "../utils/totals"

type CartItem = {
  id: string
  image: string
  name: string
  price: number
  qty: number
}

export default function Cart() {
  const { items, subtotal, updateQty, removeFromCart, clearCart } = useCart() as {
    items: CartItem[]
    subtotal: number
    updateQty: (id: string, qty: number) => void
    removeFromCart: (id: string) => void
    clearCart: () => void
  }

  const { shipping, tax, total } = calcTotals(subtotal)

  if (items.length === 0) {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <h1 className="text-3xl font-bold">Cart</h1>
        <p className="text-gray-600 mt-2">Your cart is empty.</p>
        <Link
          to="/products"
          className="inline-block mt-4 rounded-lg bg-[color:var(--primary)] text-white px-4 py-2 text-sm font-medium hover:bg-[color:var(--primary-dark)]"
        >
          Browse products
        </Link>
      </section>
    )
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-bold">Cart</h1>
          <p className="text-gray-600 mt-2">Review your items before checkout.</p>
        </div>

        <button onClick={clearCart} className="text-sm text-red-600 hover:underline">
          Clear cart
        </button>
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="border rounded-2xl bg-white p-4 flex gap-4 flex-col sm:flex-row"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full sm:w-28 h-44 sm:h-28 object-cover rounded-xl"
              />

              <div className="flex-1">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-500">{formatMoney(item.price)}</p>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-sm text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                </div>

                <div className="mt-4 flex items-center justify-between flex-wrap gap-3">
                  {/* Qty */}
                  <div className="inline-flex items-center border rounded-lg overflow-hidden">
                    <button
                      className="px-3 py-2 hover:bg-gray-50"
                      onClick={() => updateQty(item.id, item.qty - 1)}
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <div className="px-4 py-2 text-sm font-medium">{item.qty}</div>
                    <button
                      className="px-3 py-2 hover:bg-gray-50"
                      onClick={() => updateQty(item.id, item.qty + 1)}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  {/* Line total */}
                  <div className="font-semibold">
                    {formatMoney(item.price * item.qty)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <aside className="border rounded-2xl bg-white p-5 h-fit">
          <h2 className="text-lg font-bold">Order Summary</h2>

          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">{formatMoney(subtotal)}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Shipping</span>
              <span className="font-medium">{formatMoney(shipping)}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Tax</span>
              <span className="font-medium">{formatMoney(tax)}</span>
            </div>

            <div className="border-t pt-3 flex justify-between">
              <span className="font-semibold">Total</span>
              <span className="font-bold">{formatMoney(total)}</span>
            </div>
          </div>

          <Link
            to="/checkout"
            className="mt-5 block w-full text-center rounded-lg bg-[color:var(--primary)] text-white py-3 text-sm font-medium hover:bg-[color:var(--primary-dark)]"
          >
            Continue to Checkout
          </Link>

          <Link
            to="/products"
            className="mt-3 block w-full text-center rounded-lg border py-3 text-sm font-medium hover:bg-gray-50"
          >
            Continue Shopping
          </Link>
        </aside>
      </div>
    </section>
  )
}
  

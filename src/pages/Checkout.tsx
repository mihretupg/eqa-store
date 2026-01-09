import { useMemo, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useCart } from  "../context/CartContext"
import { formatMoney } from  "../utils/money"
import { calcTotals } from  "../utils/totals"
import { saveOrder } from "../utils/orders"

type CartItem = {
  id: string
  name: string
  price: number
  image: string
  qty: number
}

export default function Checkout() {
  const navigate = useNavigate()
  const { items, subtotal, clearCart } = useCart() as {
    items: CartItem[]
    subtotal: number
    clearCart: () => void
  }

  const { shipping, tax, total } = calcTotals(subtotal)

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    city: "",
    address: "",
    note: "",
  })

  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [error, setError] = useState("")

  const itemCount = useMemo(
    () => items.reduce((sum, i) => sum + i.qty, 0),
    [items]
  )

  const update = (key: string, value: string) => {
    setForm((p) => ({ ...p, [key]: value }))
  }

  const markTouched = (key: string) => {
    setTouched((p) => ({ ...p, [key]: true }))
  }

  const validate = () => {
    if (items.length === 0) return "Your cart is empty."
    if (!form.fullName.trim()) return "Full name is required."
    if (!form.phone.trim()) return "Phone number is required."
    if (!form.city.trim()) return "City is required."
    if (!form.address.trim()) return "Address is required."
    return ""
  }

  const fieldError = (key: string) => {
    if (!touched[key]) return ""
    if (key === "fullName" && !form.fullName.trim()) return "Required"
    if (key === "phone" && !form.phone.trim()) return "Required"
    if (key === "city" && !form.city.trim()) return "Required"
    if (key === "address" && !form.address.trim()) return "Required"
    return ""
  }

  const inputClass = (key: string) =>
    `w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-900/20 ${
      fieldError(key) ? "border-red-400" : "border-gray-200"
    }`

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const msg = validate()
    if (msg) {
      setError(msg)
      setTouched({
        fullName: true,
        phone: true,
        city: true,
        address: true,
        note: true,
      })
      return
    }

    setError("")

    const order = {
      id: Date.now().toString(),
      items: items.map((i) => ({
        id: i.id,
        name: i.name,
        price: i.price,
        qty: i.qty,
      })),
      subtotal,
      shipping,
      tax,
      total,
      customer: {
        fullName: form.fullName,
        phone: form.phone,
        city: form.city,
        address: form.address,
        note: form.note || undefined,
      },
      createdAt: new Date().toISOString(),
    }

    saveOrder(order)
    clearCart()
    navigate("/success", { replace: true })
  }

  if (items.length === 0) {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <h1 className="text-3xl font-bold">Checkout</h1>
        <p className="text-gray-600 mt-2">Your cart is empty.</p>
        <Link
          to="/products"
          className="inline-block mt-4 rounded-lg bg-gray-900 text-white px-4 py-2 text-sm font-medium hover:bg-black"
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
          <h1 className="text-3xl font-bold">Checkout</h1>
          <p className="text-gray-600 mt-2">
            Enter delivery details and place your order.
          </p>
        </div>

        <Link to="/cart" className="text-sm text-blue-600 hover:underline">
          ← Back to cart
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form */}
        <form onSubmit={onSubmit} className="lg:col-span-2">
          <div className="border rounded-2xl bg-white p-5">
            <h2 className="text-lg font-bold">Delivery Information</h2>

            {error && (
              <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Full Name *
                </label>
                <input
                  className={inputClass("fullName")}
                  value={form.fullName}
                  onChange={(e) => update("fullName", e.target.value)}
                  onBlur={() => markTouched("fullName")}
                  placeholder="Your name"
                />
                {fieldError("fullName") && (
                  <p className="mt-1 text-xs text-red-600">{fieldError("fullName")}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Phone *
                </label>
                <input
                  className={inputClass("phone")}
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  onBlur={() => markTouched("phone")}
                  placeholder="+251..."
                />
                {fieldError("phone") && (
                  <p className="mt-1 text-xs text-red-600">{fieldError("phone")}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  City *
                </label>
                <input
                  className={inputClass("city")}
                  value={form.city}
                  onChange={(e) => update("city", e.target.value)}
                  onBlur={() => markTouched("city")}
                  placeholder="Addis Ababa"
                />
                {fieldError("city") && (
                  <p className="mt-1 text-xs text-red-600">{fieldError("city")}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Address *
                </label>
                <input
                  className={inputClass("address")}
                  value={form.address}
                  onChange={(e) => update("address", e.target.value)}
                  onBlur={() => markTouched("address")}
                  placeholder="Street, building, etc."
                />
                {fieldError("address") && (
                  <p className="mt-1 text-xs text-red-600">{fieldError("address")}</p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label className="text-sm font-medium text-gray-700">
                  Note (optional)
                </label>
                <textarea
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-900/20 min-h-[100px]"
                  value={form.note}
                  onChange={(e) => update("note", e.target.value)}
                  placeholder="Delivery instructions..."
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-6 w-full sm:w-auto rounded-lg bg-gray-900 text-white px-6 py-3 text-sm font-medium hover:bg-black"
            >
              Place Order
            </button>
          </div>
        </form>

        {/* Summary */}
        <aside className="border rounded-2xl bg-white p-5 h-fit">
          <h2 className="text-lg font-bold">Order Summary</h2>

          <div className="mt-4 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Items</span>
              <span className="font-medium">{itemCount}</span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">{formatMoney(subtotal)}</span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Shipping</span>
              <span className="font-medium">{formatMoney(shipping)}</span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Tax</span>
              <span className="font-medium">{formatMoney(tax)}</span>
            </div>

            <div className="border-t pt-3 flex justify-between">
              <span className="font-semibold">Total</span>
              <span className="font-bold">{formatMoney(total)}</span>
            </div>
          </div>

          <p className="mt-5 text-xs text-gray-500 leading-relaxed">
            Orders are stored locally on this device (demo). Next we can connect a backend.
          </p>
        </aside>
      </div>
    </section>
  )
}


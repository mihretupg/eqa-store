import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { formatMoney } from "../utils/money"
import { clearOrders, getOrders } from "../utils/orders"
import type { Order } from "../utils/orders"
 

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    setOrders(getOrders())
  }, [])

  const onClear = () => {
    clearOrders()
    setOrders([])
  }

  if (orders.length === 0) {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <h1 className="text-3xl font-bold">Orders</h1>
        <p className="text-gray-600 mt-2">No orders yet.</p>

        <Link
          to="/products"
          className="inline-block mt-4 rounded-lg bg-[color:var(--primary)] text-white px-4 py-2 text-sm font-medium hover:bg-[color:var(--primary-dark)]"
        >
          Shop products
        </Link>
      </section>
    )
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-bold">Order History</h1>
          <p className="text-gray-600 mt-2">
            Your recent orders are saved on this device.
          </p>
        </div>

        <button onClick={onClear} className="text-sm text-red-600 hover:underline">
          Clear order history
        </button>
      </div>

      <div className="mt-6 space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="border rounded-2xl bg-white p-5">
            <div className="flex flex-wrap justify-between gap-4">
              <div>
                <p className="font-semibold">Order #{order.id}</p>
                <p className="text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleString()}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  {order.customer.fullName} - {order.customer.city}
                </p>
              </div>

              <p className="font-bold">{formatMoney(order.total)}</p>
            </div>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
              {order.items.map((item) => (
                <div key={item.id} className="flex justify-between gap-4">
                  <span className="text-gray-700">
                    {item.name} - {item.qty}
                  </span>
                  <span className="font-medium">
                    {formatMoney(item.price * item.qty)}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 border-t pt-3 text-sm space-y-1">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">{formatMoney(order.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">{formatMoney(order.shipping)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium">{formatMoney(order.tax)}</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>{formatMoney(order.total)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Orders




import { Link } from "react-router-dom"

const supportItems = [
  {
    title: "Order status",
    description: "Track orders and get delivery updates.",
    action: "View orders",
    href: "/orders",
  },
  {
    title: "Shipping & returns",
    description: "Learn about delivery times and return options.",
    action: "View policies",
    href: "/products",
  },
  {
    title: "Need help?",
    description: "Reach out to our team for quick support.",
    action: "Contact us",
    href: "/account",
  },
]

export default function Support() {
  return (
    <section className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold">Support</h1>
      <p className="text-gray-600 mt-2">
        Get help with orders, shipping, and returns.
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {supportItems.map((item) => (
          <div key={item.title} className="card-shell">
            <h2 className="text-lg font-semibold text-gray-900">{item.title}</h2>
            <p className="mt-2 text-sm text-gray-600">{item.description}</p>
            <Link
              to={item.href}
              className="mt-4 inline-flex text-sm font-semibold text-[color:var(--primary)] hover:underline"
            >
              {item.action}
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}

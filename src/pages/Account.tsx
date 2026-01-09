import { Link } from "react-router-dom"

const quickLinks = [
  { label: "Orders", href: "/orders" },
  { label: "Cart", href: "/cart" },
  { label: "Support", href: "/support" },
]

export default function Account() {
  return (
    <section className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold">Account</h1>
      <p className="text-gray-600 mt-2">
        Manage your profile, addresses, and preferences.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="card-shell">
          <h2 className="text-lg font-semibold text-gray-900">Profile</h2>
          <p className="mt-2 text-sm text-gray-600">
            Signed in as <span className="font-semibold text-gray-900">Guest</span>.
          </p>
          <button className="mt-4 inline-flex rounded-md border px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50">
            Edit profile
          </button>
        </div>

        <div className="card-shell">
          <h2 className="text-lg font-semibold text-gray-900">Quick links</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {quickLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="inline-flex rounded-md bg-[color:var(--primary)] px-4 py-2 text-sm font-semibold text-white hover:bg-[color:var(--primary-dark)]"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

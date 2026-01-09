import { Link, NavLink } from "react-router-dom"
import { useCart } from "../context/CartContext"

const navClass = ({ isActive }: { isActive: boolean }) =>
  `px-3 py-2 rounded-md text-sm font-medium transition ${
    isActive ? "bg-gray-900 text-white" : "text-gray-700 hover:bg-gray-100"
  }`

export default function Navbar() {
  const { items } = useCart()
  const count = items.reduce((sum, i) => sum + i.qty, 0)

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
        <Link to="/" className="text-xl font-bold whitespace-nowrap">
          Eqa
        </Link>

        <nav className="flex items-center gap-2 flex-wrap justify-end">
          <NavLink to="/" className={navClass} end>
            Home
          </NavLink>

          <NavLink to="/products" className={navClass}>
            Products
          </NavLink>

          <NavLink to="/cart" className={navClass}>
            <span className="inline-flex items-center gap-2">
              Cart
              {count > 0 && (
                <span className="min-w-6 h-6 px-2 rounded-full bg-gray-900 text-white text-xs flex items-center justify-center">
                  {count}
                </span>
              )}
            </span>
          </NavLink>
        </nav>
      </div>
    </header>
  )
}

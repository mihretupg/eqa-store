import { useState } from "react"
import { Link, NavLink, useNavigate } from "react-router-dom"
import { useCart } from "../context/CartContext"

const navClass = ({ isActive }: { isActive: boolean }) =>
  `px-3 py-2 rounded-md text-sm font-medium transition ${
    isActive ? "bg-gray-900 text-white" : "text-gray-700 hover:bg-gray-100"
  }`

export default function Navbar() {
  const { count } = useCart() as { count: number }
  const navigate = useNavigate()

  const [open, setOpen] = useState(false)
  const [term, setTerm] = useState("")

  const closeMenu = () => setOpen(false)

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const q = term.trim()
    closeMenu()
    navigate(q ? `/products?q=${encodeURIComponent(q)}` : "/products")
  }

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
        <Link to="/" className="text-xl font-bold whitespace-nowrap" onClick={closeMenu}>
          Eqa
        </Link>

        {/* Search (desktop) */}
        <form onSubmit={submitSearch} className="hidden md:flex flex-1 max-w-md mx-4">
          <input
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="Search products..."
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-900/20"
          />
        </form>

        {/* Desktop nav */}
        <nav className="hidden sm:flex items-center gap-2">
          <NavLink to="/" className={navClass} end>
            Home
          </NavLink>
          <NavLink to="/products" className={navClass}>
            Products
          </NavLink>
          <NavLink to="/orders" className={navClass}>
            Orders
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

        {/* Mobile button */}
        <button
          className="sm:hidden inline-flex items-center justify-center rounded-lg border px-3 py-2 text-sm font-medium hover:bg-gray-50"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="sm:hidden border-t bg-white">
          <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-3">
            {/* Search (mobile) */}
            <form onSubmit={submitSearch}>
              <input
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                placeholder="Search products..."
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-900/20"
              />
            </form>

            <NavLink to="/" className={navClass} end onClick={closeMenu}>
              Home
            </NavLink>
            <NavLink to="/products" className={navClass} onClick={closeMenu}>
              Products
            </NavLink>
            <NavLink to="/orders" className={navClass} onClick={closeMenu}>
              Orders
            </NavLink>
            <NavLink to="/cart" className={navClass} onClick={closeMenu}>
              <span className="inline-flex items-center gap-2">
                Cart
                {count > 0 && (
                  <span className="min-w-6 h-6 px-2 rounded-full bg-gray-900 text-white text-xs flex items-center justify-center">
                    {count}
                  </span>
                )}
              </span>
            </NavLink>
          </div>
        </div>
      )}
    </header>
  )
}

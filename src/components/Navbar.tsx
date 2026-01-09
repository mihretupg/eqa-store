import { useState } from "react"
import { Link, NavLink, useNavigate } from "react-router-dom"
import { useCart } from "../context/CartContext"

const navClass = ({ isActive }: { isActive: boolean }) =>
  `px-3 py-2 rounded-md text-sm font-medium transition ${
    isActive ? "bg-[color:var(--primary)] text-white" : "text-gray-700 hover:bg-gray-100"
  }`

const cartNavClass = ({ isActive }: { isActive: boolean }) =>
  `px-3 py-2 rounded-md text-sm font-medium transition ${
    isActive ? "text-[color:var(--primary)]" : "text-gray-700 hover:bg-gray-100"
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
    <header className="bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-bold whitespace-nowrap"
          onClick={closeMenu}
        >
          <img src="/logo.png" alt="Eqa" className="h-[150px] w-auto" />

            </Link>

        {/* Search (desktop) */}
        <form onSubmit={submitSearch} className="hidden md:flex flex-1 max-w-md mx-4">
          <input
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="Search products..."
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[color:var(--primary)]/20"
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
          <NavLink to="/deals" className={navClass}>
            Deals
          </NavLink>
          <NavLink to="/categories" className={navClass}>
            Categories
          </NavLink>
          <NavLink to="/new-arrivals" className={navClass}>
            New Arrivals
          </NavLink>
          <NavLink to="/best-sellers" className={navClass}>
            Best Sellers
          </NavLink>
          <NavLink to="/support" className={navClass}>
            Support
          </NavLink>
          <NavLink to="/account" className={navClass}>
            Account
          </NavLink>
          <NavLink to="/orders" className={navClass}>
            Orders
          </NavLink>
          <NavLink to="/cart" className={cartNavClass} aria-label="Cart">
            <span className="inline-flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5 text-[color:var(--primary)]"
                aria-hidden="true"
              >
                <path d="M7 4a1 1 0 0 0-1 1v1H3a1 1 0 1 0 0 2h1.2l1.5 8.4A3 3 0 0 0 8.7 19h7.6a3 3 0 0 0 3-2.4l1.3-7.6A1 1 0 0 0 19.6 8H7.3l-.3-2H7Z" />
                <path d="M9 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm8 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
              </svg>
              {count > 0 && (
                <span className="min-w-6 h-6 px-2 rounded-full bg-[color:var(--primary)] text-white text-xs flex items-center justify-center">
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
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[color:var(--primary)]/20"
              />
            </form>

            <NavLink to="/" className={navClass} end onClick={closeMenu}>
              Home
            </NavLink>
            <NavLink to="/products" className={navClass} onClick={closeMenu}>
              Products
            </NavLink>
            <NavLink to="/deals" className={navClass} onClick={closeMenu}>
              Deals
            </NavLink>
            <NavLink to="/categories" className={navClass} onClick={closeMenu}>
              Categories
            </NavLink>
            <NavLink to="/new-arrivals" className={navClass} onClick={closeMenu}>
              New Arrivals
            </NavLink>
            <NavLink to="/best-sellers" className={navClass} onClick={closeMenu}>
              Best Sellers
            </NavLink>
            <NavLink to="/support" className={navClass} onClick={closeMenu}>
              Support
            </NavLink>
            <NavLink to="/account" className={navClass} onClick={closeMenu}>
              Account
            </NavLink>
            <NavLink to="/orders" className={navClass} onClick={closeMenu}>
              Orders
            </NavLink>
            <NavLink to="/cart" className={cartNavClass} onClick={closeMenu} aria-label="Cart">
              <span className="inline-flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5 text-[color:var(--primary)]"
                  aria-hidden="true"
                >
                  <path d="M7 4a1 1 0 0 0-1 1v1H3a1 1 0 1 0 0 2h1.2l1.5 8.4A3 3 0 0 0 8.7 19h7.6a3 3 0 0 0 3-2.4l1.3-7.6A1 1 0 0 0 19.6 8H7.3l-.3-2H7Z" />
                  <path d="M9 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm8 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
                </svg>
                {count > 0 && (
                  <span className="min-w-6 h-6 px-2 rounded-full bg-[color:var(--primary)] text-white text-xs flex items-center justify-center">
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


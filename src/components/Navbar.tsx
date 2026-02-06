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
      <div className="w-full bg-slate-900 text-white text-xs sm:text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-center">
          <Link
            to="/products"
            className="group inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 font-semibold tracking-wide text-white transition hover:bg-white/20"
            onClick={closeMenu}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-4 w-4 text-[color:var(--secondary)]"
              aria-hidden="true"
            >
              <path d="M11 3a3 3 0 0 0-3 3v1H6a2 2 0 0 0-2 2v3h7V7h2v5h7V9a2 2 0 0 0-2-2h-2V6a3 3 0 0 0-3-3h-2Zm-3 5h8V6a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v2Z" />
              <path d="M4 13v6a2 2 0 0 0 2 2h5v-8H4Zm9 8h5a2 2 0 0 0 2-2v-6h-7v8Z" />
            </svg>
            Valentine's Day: 40% off select gifts
          </Link>
          <span className="opacity-80">Free shipping over $50</span>
          <span className="opacity-80">Fast delivery, easy returns</span>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-0 pb-0 sm:pt-0 sm:pb-0">
        <div className="flex items-center justify-between gap-3 -mt-2 sm:mt-0">
          <Link
            to="/"
            className="flex items-center gap-2 text-xl font-bold whitespace-nowrap"
            onClick={closeMenu}
          >
            <img
              src="/logo.png"
              alt="Eqa"
              className="h-[180px] w-auto sm:h-[200px]"
            />
          </Link>

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
          {open ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path d="M6 6l12 12" />
              <path d="M6 18L18 6" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path d="M3 6h18" />
              <path d="M3 12h18" />
              <path d="M3 18h18" />
            </svg>
          )}
        </button>
        </div>

        {/* Search (desktop) */}
        <form onSubmit={submitSearch} className="hidden md:flex mt-2">
          <input
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="Search products..."
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[color:var(--primary)]/20"
          />
        </form>
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


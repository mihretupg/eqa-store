import products from "../data/products"
import ProductCard from "../components/ProductCard"
import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

export default function Home() {
  const deals = products.slice(0, 4)
  const picks = products.slice(2, 6)
  const heroProduct = products[1]
  const [term, setTerm] = useState("")
  const navigate = useNavigate()
  const departments = [
    {
      title: "Style refresh",
      subtitle: "Everyday fits under $50",
      image: products[0].image,
    },
    {
      title: "Tech finds",
      subtitle: "Sound, smart, and simple",
      image: products[3].image,
    },
    {
      title: "Home setup",
      subtitle: "Lighting and desk essentials",
      image: products[5].image,
    },
    {
      title: "Travel ready",
      subtitle: "Backpacks and accessories",
      image: products[2].image,
    },
  ]

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]")
    )

    if (reduceMotion) {
      elements.forEach((el) => el.classList.add("is-visible"))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible")
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-amber-50 via-white to-slate-50">
      <div className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-[color:var(--secondary)]/30 blur-3xl blob-float" />
      <div className="pointer-events-none absolute top-32 -left-24 h-72 w-72 rounded-full bg-[color:var(--primary)]/30 blur-3xl blob-float delay-blob" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-10">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] items-center">
          <div className="rounded-3xl border border-[color:var(--secondary-soft)] bg-white/90 p-6 shadow-sm backdrop-blur reveal" data-reveal>
            <div className="inline-flex items-center gap-2 rounded-full bg-[color:var(--secondary-soft)] px-3 py-1 text-xs font-semibold text-[color:var(--secondary-dark)]">
              Prime Day Preview
            </div>
            <h1 className="mt-4 text-4xl sm:text-5xl font-bold text-[color:var(--ink)]">
              Big deals, fast delivery, and a storefront made for speed.
            </h1>
            <p className="mt-4 text-base text-slate-600 max-w-xl">
              Shop the newest drops with ease. Quick filters, fast add to
              cart, and essentials picked for you.
            </p>

            <form
              className="mt-6 flex flex-col sm:flex-row gap-3"
              onSubmit={(e) => {
                e.preventDefault()
                const q = term.trim()
                navigate(q ? `/products?q=${encodeURIComponent(q)}` : "/products")
              }}
            >
              <div className="flex-1 rounded-xl border bg-white px-4 py-3 shadow-sm">
                <input
                  value={term}
                  onChange={(e) => setTerm(e.target.value)}
                  className="w-full text-sm text-slate-700 outline-none placeholder:text-slate-400"
                  placeholder="Search products, brands, and more"
                  aria-label="Search products"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-xl bg-[color:var(--primary)] px-5 py-3 text-sm font-semibold text-white hover:bg-[color:var(--primary-dark)]"
              >
                Search
              </button>
            </form>

            <div className="mt-5 flex flex-wrap gap-2 text-xs font-semibold text-slate-700">
              {["Trending", "Fast Shipping", "Top Rated", "Under $50"].map(
                (pill) => (
                  <span
                    key={pill}
                    className="rounded-full border border-slate-200 bg-white px-3 py-1"
                  >
                    {pill}
                  </span>
                )
              )}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm reveal deal-card" data-reveal>
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="font-semibold text-[color:var(--secondary)] deal-badge rounded-full px-3 py-1 bg-[color:var(--secondary-soft)]">
                Deal of the day
              </span>
              <span>Ends in 06:42:19</span>
            </div>
            <Link
              to={`/products/${heroProduct.id}`}
              className="group mt-4 block overflow-hidden rounded-2xl"
              aria-label={`View ${heroProduct.name}`}
            >
              <img
                src={heroProduct.image}
                alt={heroProduct.name}
                className="h-50 w-full object-cover transition duration-300 group-hover:scale-[1.05]"
              />
            </Link>
            <h2 className="mt-4 text-xl font-semibold text-slate-900">
              {heroProduct.name}
            </h2>
            <p className="mt-1 text-sm text-slate-500">{heroProduct.category}</p>
            <div className="mt-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500 line-through">
                  ${(heroProduct.price + 20).toFixed(2)}
                </p>
                <p className="text-2xl font-bold text-slate-900">
                  ${heroProduct.price.toFixed(2)}
                </p>
              </div>
              <Link
                to={`/products/${heroProduct.id}`}
                className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50"
              >
                View deal
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 reveal" data-reveal>
          {departments.map((dept) => (
            <Link
              key={dept.title}
              to="/products"
              className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="overflow-hidden rounded-xl">
                <img
                  src={dept.image}
                  alt={dept.title}
                  className="h-36 w-full object-cover transition group-hover:scale-105"
                />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">
                {dept.title}
              </h3>
              <p className="mt-1 text-sm text-slate-500">{dept.subtitle}</p>
              <span className="mt-3 inline-flex text-sm font-semibold text-[color:var(--secondary)]">
                Shop now
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-12 flex items-end justify-between reveal" data-reveal>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Today's deals</h2>
            <p className="mt-1 text-sm text-slate-500">
              Limited-time offers with extra savings.
            </p>
          </div>
          <Link to="/products" className="text-sm font-semibold text-[color:var(--secondary)] hover:underline">
            See all deals
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 reveal" data-reveal>
          {deals.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        <div className="mt-12 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:flex md:items-center md:justify-between reveal" data-reveal>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Delivery in days, not weeks
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Fast checkout, easy returns, and tracking that actually updates.
            </p>
          </div>
          <div className="mt-4 flex gap-3 md:mt-0">
            <Link
              to="/products"
              className="rounded-xl bg-[color:var(--primary)] px-5 py-3 text-sm font-semibold text-white hover:bg-[color:var(--primary-dark)]"
            >
              Start shopping
            </Link>
            <Link
              to="/cart"
              className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50"
            >
              View cart
            </Link>
          </div>
        </div>

        <div className="mt-12 flex items-end justify-between reveal" data-reveal>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Recommended for you</h2>
            <p className="mt-1 text-sm text-slate-500">
              Picks based on what's trending this week.
            </p>
          </div>
          <Link to="/products" className="text-sm font-semibold text-[color:var(--secondary)] hover:underline">
            View more
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 reveal" data-reveal>
          {picks.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  )
}

import products from "../data/products"
import ProductCard from "../components/ProductCard"
import { Link } from "react-router-dom"

export default function Home() {
  const deals = products.slice(0, 4)
  const picks = products.slice(2, 6)
  const heroProduct = products[1]
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

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-amber-50 via-white to-slate-50">
      <div className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-amber-200/40 blur-3xl" />
      <div className="pointer-events-none absolute top-32 -left-24 h-72 w-72 rounded-full bg-sky-200/40 blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-10">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] items-center">
          <div className="rounded-3xl border border-amber-100 bg-white/90 p-6 shadow-sm backdrop-blur animate-fade-up">
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-900">
              Prime Day Preview
            </div>
            <h1 className="mt-4 text-4xl sm:text-5xl font-bold text-[color:var(--ink)]">
              Big deals, fast delivery, and a storefront made for speed.
            </h1>
            <p className="mt-4 text-base text-slate-600 max-w-xl">
              Shop the newest drops with Amazon-style ease. Quick filters, fast add to
              cart, and essentials picked for you.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <div className="flex-1 rounded-xl border bg-white px-4 py-3 shadow-sm">
                <input
                  className="w-full text-sm text-slate-700 outline-none placeholder:text-slate-400"
                  placeholder="Search products, brands, and more"
                  aria-label="Search products"
                />
              </div>
              <Link
                to="/products"
                className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-black"
              >
                Search
              </Link>
            </div>

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

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm animate-fade-up delay-1">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="font-semibold text-amber-600">Deal of the day</span>
              <span>Ends in 06:42:19</span>
            </div>
            <div className="mt-4 overflow-hidden rounded-2xl">
              <img
                src={heroProduct.image}
                alt={heroProduct.name}
                className="h-56 w-full object-cover"
              />
            </div>
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

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 animate-fade-up delay-2">
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
              <span className="mt-3 inline-flex text-sm font-semibold text-amber-700">
                Shop now
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-12 flex items-end justify-between animate-fade-up delay-2">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Today's deals</h2>
            <p className="mt-1 text-sm text-slate-500">
              Limited-time offers with extra savings.
            </p>
          </div>
          <Link to="/products" className="text-sm font-semibold text-amber-700 hover:underline">
            See all deals
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 animate-fade-up delay-3">
          {deals.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        <div className="mt-12 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:flex md:items-center md:justify-between animate-fade-up delay-3">
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
              className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-black"
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

        <div className="mt-12 flex items-end justify-between animate-fade-up delay-3">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Recommended for you</h2>
            <p className="mt-1 text-sm text-slate-500">
              Picks based on what's trending this week.
            </p>
          </div>
          <Link to="/products" className="text-sm font-semibold text-amber-700 hover:underline">
            View more
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 animate-fade-up delay-4">
          {picks.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  )
}

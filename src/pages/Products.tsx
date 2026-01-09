import { useEffect, useMemo, useState } from "react"
import { useSearchParams } from "react-router-dom"

import products from "../data/products"
import ProductCard from "../components/ProductCard"

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams()

  const urlQ = searchParams.get("q") || ""
  const [query, setQuery] = useState(urlQ)
  const [category, setCategory] = useState("All")
  const [sort, setSort] = useState("featured") // featured | price-asc | price-desc | name-asc | name-desc

  // Keep query state synced if user navigates back/forward or arrives from Navbar search
  useEffect(() => {
    const nextQ = searchParams.get("q") || ""
    if (nextQ !== query) setQuery(nextQ)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category))
    return ["All", ...Array.from(set)]
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()

    let list = products.filter((p) => {
      const matchesQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)

      const matchesCategory = category === "All" || p.category === category
      return matchesQuery && matchesCategory
    })

    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price)
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price)
    if (sort === "name-asc") list = [...list].sort((a, b) => a.name.localeCompare(b.name))
    if (sort === "name-desc") list = [...list].sort((a, b) => b.name.localeCompare(a.name))

    return list
  }, [query, category, sort])

  const updateUrlQ = (value: string) => {
    const next = new URLSearchParams(searchParams)
    const v = value.trim()
    if (v) next.set("q", value) // keep user's exact typing (spaces etc.)
    else next.delete("q")
    setSearchParams(next, { replace: true })
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-bold">Products</h1>
          <p className="text-gray-600 mt-2">Search, filter, and sort items on Eqa.</p>
        </div>

        <div className="text-sm text-gray-500">
          Showing <span className="font-medium text-gray-900">{filtered.length}</span> of{" "}
          <span className="font-medium text-gray-900">{products.length}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Search */}
        <div className="md:col-span-1">
          <label className="text-sm font-medium text-gray-700">Search</label>
          <input
            value={query}
            onChange={(e) => {
              const v = e.target.value
              setQuery(v)
              updateUrlQ(v)
            }}
            placeholder="Search products..."
            className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-900/20"
          />
        </div>

        {/* Category */}
        <div>
          <label className="text-sm font-medium text-gray-700">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-900/20 bg-white"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Sort */}
        <div>
          <label className="text-sm font-medium text-gray-700">Sort</label>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-900/20 bg-white"
          >
            <option value="featured">Featured (default)</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="name-asc">Name: A → Z</option>
            <option value="name-desc">Name: Z → A</option>
          </select>
        </div>
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="mt-10 border rounded-2xl bg-white p-6">
          <h2 className="text-lg font-bold">No products found</h2>
          <p className="text-gray-600 mt-2">
            Try changing your search or selecting a different category.
          </p>
          <button
            onClick={() => {
              setQuery("")
              setCategory("All")
              setSort("featured")
              updateUrlQ("")
            }}
            className="mt-4 rounded-lg bg-gray-900 text-white px-4 py-2 text-sm font-medium hover:bg-black"
          >
            Reset filters
          </button>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </section>
  )
}

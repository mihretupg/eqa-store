import { Link } from "react-router-dom"

export default function NotFound() {
  return (
    <section className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold">404</h1>
      <p className="text-gray-600 mt-2">Page not found.</p>
      <Link to="/" className="inline-block mt-4 text-blue-600 hover:underline">
        Go Home
      </Link>
    </section>
  )
}

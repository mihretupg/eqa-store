export default function Footer() {
  return (
    <footer className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col items-center gap-3 text-sm text-gray-500 sm:flex-row sm:justify-between">
        <img src="/logo.png" alt="eQa" className="h-24 w-auto sm:h-32 md:h-36" />
        <span>{new Date().getFullYear()} eQa. All rights reserved.</span>
      </div>
    </footer>
  )
}

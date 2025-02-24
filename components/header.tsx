import Link from "next/link"

export function Header() {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-6">
        <Link href="/" className="text-2xl font-bold text-gray-800">
        GRT Dashboard
        </Link>
      </div>
    </header>
  )
}


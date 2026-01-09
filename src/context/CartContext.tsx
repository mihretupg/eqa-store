import { createContext, useContext, useEffect, useMemo, useState } from "react"
import type { ReactNode } from "react"

type CartItem = {
  id: string
  name: string
  price: number
  image: string
  qty: number
}

type Product = Omit<CartItem, "qty">

type CartContextType = {
  items: CartItem[]
  addToCart: (product: Product) => void
  removeFromCart: (id: string) => void
  updateQty: (id: string, qty: number) => void
  clearCart: () => void
  subtotal: number
  count: number
}

const CartContext = createContext<CartContextType | null>(null)

const STORAGE_KEY = "eqa_cart_v1"

function safeParseCart(raw: string | null): CartItem[] {
  try {
    if (!raw) return []
    const data = JSON.parse(raw)
    if (!Array.isArray(data)) return []
    // basic shape validation
    return data
      .filter(
        (i: any) =>
          i &&
          typeof i.id === "string" &&
          typeof i.name === "string" &&
          typeof i.price === "number" &&
          typeof i.image === "string" &&
          typeof i.qty === "number"
      )
      .map((i: any) => ({ ...i, qty: Math.max(1, Math.floor(i.qty)) }))
  } catch {
    return []
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? safeParseCart(raw) : []
  })

  // Save to localStorage on every cart change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const addToCart = (product: Product) => {
    setItems((prev) => {
      const found = prev.find((i) => i.id === product.id)
      if (found) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + 1 } : i
        )
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          qty: 1,
        },
      ]
    })
  }

  const removeFromCart = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }

  const updateQty = (id: string, qty: number) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, qty: Math.max(1, qty) } : i))
    )
  }

  const clearCart = () => setItems([])

  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.price * i.qty, 0),
    [items]
  )

  const count = useMemo(
    () => items.reduce((sum, i) => sum + i.qty, 0),
    [items]
  )

  const value: CartContextType = { items, addToCart, removeFromCart, updateQty, clearCart, subtotal, count }
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used inside CartProvider")
  return ctx
}

export type OrderItem = {
  id: string
  name: string
  price: number
  qty: number
}

export type OrderCustomer = {
  fullName: string
  phone: string
  city: string
  address: string
  note?: string
}

export type Order = {
  id: string
  items: OrderItem[]
  subtotal: number
  shipping: number
  tax: number
  total: number
  customer: OrderCustomer
  createdAt: string
}

const STORAGE_KEY = "eqa_orders_v1"

export function getOrders(): Order[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function saveOrder(order: Order) {
  const orders = getOrders()
  orders.unshift(order)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders))
}

export function clearOrders() {
  localStorage.removeItem(STORAGE_KEY)
}

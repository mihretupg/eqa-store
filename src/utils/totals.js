export function calcTotals(subtotal) {
  const sub = Number(subtotal) || 0

  // Simple demo rules (you can change later)
  const shipping = sub > 0 ? 4.99 : 0
  const taxRate = 0.05 // 5% demo
  const tax = sub * taxRate
  const total = sub + shipping + tax

  return {
    subtotal: sub,
    shipping,
    tax,
    total,
  }
}

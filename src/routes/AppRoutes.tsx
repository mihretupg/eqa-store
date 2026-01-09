import { Routes, Route } from "react-router-dom"
import MainLayout from "../layouts/MainLayout"

import Home from "../pages/Home"
import Products from "../pages/Products"
import ProductDetails from "../pages/ProductDetails"
import Cart from "../pages/Cart"
import Checkout from "../pages/Checkout"
import Success from "../pages/Success"
import Orders from "../pages/Orders"
import NotFound from "../pages/NotFound"

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />

        {/* Lesson 9 */}
        <Route path="/success" element={<Success />} />
        <Route path="/orders" element={<Orders />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

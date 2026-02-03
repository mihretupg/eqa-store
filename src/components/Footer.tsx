export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
        
        {/* Brand / About */}
        <div>
          <img src="/logo.png" alt="eQa" className="h-20 w-auto mb-4" />
          <p className="text-sm text-gray-600">
            eQa is your trusted online marketplace for quality products,
            fast delivery, and secure payments.
          </p>

          {/* App Badges */}
          <div className="mt-4 flex gap-3">
            <img
              src="/appstore.png"
              alt="Download on App Store"
              className="h-10 cursor-pointer"
            />
            <img
              src="/playstore.png"
              alt="Get it on Google Play"
              className="h-10 cursor-pointer"
            />
          </div>
        </div>

        {/* Shop */}
        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-3">Shop</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><a href="#" className="hover:text-gray-900">All Products</a></li>
            <li><a href="#" className="hover:text-gray-900">New Arrivals</a></li>
            <li><a href="#" className="hover:text-gray-900">Best Sellers</a></li>
            <li><a href="#" className="hover:text-gray-900">Deals & Offers</a></li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-3">
            Customer Service
          </h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><a href="#" className="hover:text-gray-900">Contact Us</a></li>
            <li><a href="#" className="hover:text-gray-900">FAQs</a></li>
            <li><a href="#" className="hover:text-gray-900">Shipping & Returns</a></li>
            <li><a href="#" className="hover:text-gray-900">Order Tracking</a></li>
          </ul>
        </div>

        {/* Legal + Payments */}
        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-3">Legal</h4>
          <ul className="space-y-2 text-sm text-gray-600 mb-4">
            <li><a href="#" className="hover:text-gray-900">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-gray-900">Terms & Conditions</a></li>
            <li><a href="#" className="hover:text-gray-900">Refund Policy</a></li>
          </ul>

          {/* Payment Methods */}
          <h4 className="text-sm font-semibold text-gray-900 mb-2">
            Payment Methods
          </h4>
          <div className="flex flex-wrap gap-3 items-center">
            <img src="/visa.png" alt="Visa" className="h-8" />
            <img src="/card.png" alt="Mastercard" className="h-8" />
            <img src="/paypal.png" alt="PayPal" className="h-8" />
            <img src="/telebirr.jpg" alt="Telebirr" className="h-8" />
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-3 text-sm text-gray-500 sm:flex-row sm:justify-between sm:items-center">
          <span>© {new Date().getFullYear()} eQa. All rights reserved.</span>

          
     
        </div>
      </div>
    </footer>
  )
}

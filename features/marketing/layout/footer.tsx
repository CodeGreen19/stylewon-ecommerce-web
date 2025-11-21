export default function Footer() {
  return (
    <footer className="border-t mt-10">
      <div className="max-w-5xl mx-auto px-4 xl:px-0 py-10">
        {/* Top Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h4 className="font-semibold mb-3 text-sm">SHOP</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Men</li>
              <li>Women</li>
              <li>Kids</li>
              <li>Accessories</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-sm">SUPPORT</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Contact Us</li>
              <li>FAQs</li>
              <li>Shipping</li>
              <li>Returns</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-sm">COMPANY</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>About Us</li>
              <li>Careers</li>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-sm">NEWSLETTER</h4>
            <div className="flex items-center gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="h-10 px-3 text-sm border rounded-md w-full focus:outline-none"
              />
              <button className="h-10 px-4 text-sm bg-black text-white rounded-md">
                Join
              </button>
            </div>
          </div>
        </div>
        <div className="border-t pt-5 mt-10  text-sm text-muted-foreground flex justify-between">
          <p>© 2025 ModernShop. All rights reserved.</p>
          <p className="text-xs">Crafted with ❤️</p>
        </div>
      </div>
      {/* Divider */}
    </footer>
  );
}

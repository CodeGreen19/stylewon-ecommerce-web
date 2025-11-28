import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Footer() {
  return (
    <footer className="border-t border-dashed border-cyan-500 mt-10">
      <div className="max-w-5xl mx-auto px-3 xl:px-0 py-10">
        {/* Top Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h4 className="font-semibold mb-3 text-base">Shop</h4>
            <ul className="space-y-2 text-sm text-foreground">
              <li>Men</li>
              <li>Women</li>
              <li>Kids</li>
              <li>Accessories</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-base">Support</h4>
            <ul className="space-y-2 text-sm text-foreground">
              <li>Contact Us</li>
              <li>FAQs</li>
              <li>Shipping</li>
              <li>Returns</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-base">Company</h4>
            <ul className="space-y-2 text-sm text-foreground">
              <li>About Us</li>
              <li>Careers</li>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-base">Newsletter</h4>
            <div className="flex items-center gap-2">
              <Input
                className="border-cyan-800 bg-cyan-200"
                type="email"
                placeholder="Your email"
              />
              <Button className=" px-4 text-sm bg-black text-white">
                Join
              </Button>
            </div>
          </div>
        </div>
        <div className="border-t  border-dashed border-cyan-600 pt-5 mt-10  text-sm text-foreground flex justify-between">
          <p>© 2025 ModernShop. All rights reserved.</p>
          <p className="text-xs">Crafted with ❤️</p>
        </div>
      </div>
      {/* Divider */}
    </footer>
  );
}

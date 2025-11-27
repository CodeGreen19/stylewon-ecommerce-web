"use client";

import Logo from "@/components/shared/logo";
import AuthNavDropdown from "@/features/auth/components/auth-nav-dropdown";
import AuthWrapper from "@/features/auth/components/auth-wrapper";
import { authClient } from "@/lib/auth-client";
import { Search, ShoppingCart, User } from "lucide-react";
import CartToPaymentWrapper from "../components/cart-to-payment/cart-to-payment-wrapper";

export default function Navbar() {
  const { isPending, data } = authClient.useSession();
  return (
    <div className="border-b bg-white/50 backdrop-blur-md  sticky top-0 right-0">
      <div className=" max-w-5xl m-auto flex items-center justify-between h-20 px-4 xl:px-0">
        <div>
          <Logo />
        </div>
        <div className="flex items-center gap-6">
          <Search />

          <CartToPaymentWrapper>
            <ShoppingCart />
          </CartToPaymentWrapper>
          {isPending ? (
            <User />
          ) : (
            <div>
              {data ? (
                <AuthNavDropdown>
                  <User />
                </AuthNavDropdown>
              ) : (
                <AuthWrapper>
                  <User />
                </AuthWrapper>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

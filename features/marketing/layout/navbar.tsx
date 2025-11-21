import Logo from "@/components/shared/logo";
import { Search, ShoppingCart, User } from "lucide-react";
import React from "react";

export default function Navbar() {
  return (
    <div className="border-b  ">
      <div className=" max-w-5xl m-auto flex items-center justify-between h-20 px-4 xl:px-0">
        <div>
          <Logo />
        </div>
        <div className="flex items-center gap-6">
          <Search />

          <ShoppingCart />
          <User />
        </div>
      </div>
    </div>
  );
}

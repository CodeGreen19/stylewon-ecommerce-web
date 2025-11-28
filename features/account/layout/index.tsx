"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const data = [
  { title: "Profile", url: "/account/profile" },
  {
    title: "Orders",
    url: "/account/orders",
  },
];

export default function AccountLayout(props: LayoutProps<"/account">) {
  const pathname = usePathname().split("?")[0];

  return (
    <div className="min-h-screen bg-transparent max-w-5xl m-auto px-4 lg:px-0 grid grid-cols-1 md:grid-cols-[200px_1fr] ">
      <div className="border-r pr-4 pt-6 hidden md:flex flex-col space-y-1 ">
        {data.map((item) => (
          <Link key={item.url} href={item.url}>
            <Button
              variant={pathname === item.url ? "secondary" : "ghost"}
              className={cn(" w-full py-5")}
            >
              {item.title}
            </Button>
          </Link>
        ))}
      </div>{" "}
      <div className="p-6">{props.children}</div>
    </div>
  );
}

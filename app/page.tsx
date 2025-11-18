import { Button } from "@/components/ui/button";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";

export default function page() {
  return (
    <div className="flex items-center flex-col gap-4">
      <div className="p-5 text-2xl font-semibold">Stylewon Ecommerce</div>
      <Link href={"/admin/catalog/products"}>
        <Button>
          Admin <ChevronRightIcon />
        </Button>
      </Link>
    </div>
  );
}

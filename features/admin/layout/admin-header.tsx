import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { adminSidebarNavItems, useAdminBreadcrumb } from "./utils";
import { Fragment } from "react";
import { ChevronRight } from "lucide-react";

export default function AdminHeader() {
  const pathname = usePathname();
  const exactPathname = pathname.split("?")[0];
  const crumb = useAdminBreadcrumb(adminSidebarNavItems, exactPathname);

  return (
    <header className="sticky top-0 right-0 z-50 flex h-16 shrink-0 items-center gap-2 border-b border-dotted bg-transparent backdrop-blur-sm">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        <Breadcrumb>
          <BreadcrumbList>
            {crumb.map((c, i) => (
              <Fragment>
                <BreadcrumbItem key={c.url}>
                  <BreadcrumbLink asChild>
                    <Link href={c.url ?? ""}>{c.title}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {i < crumb.length - 1 && <ChevronRight size={15} />}
              </Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  );
}

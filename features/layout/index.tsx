"use client";

import { AppSidebar } from "@/features/layout/app-sidebar";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";
type CrumbLink = {
  url?: string;
  title: string;
};

type BreadcrumbConfig = {
  pathname: string;
  links: CrumbLink[];
};

const breadcrumbConfig: BreadcrumbConfig[] = [
  {
    pathname: "/admin/home/overviews",
    links: [
      {
        title: "Overviews",
        url: "/admin/home/overviews",
      },
    ],
  },
  {
    pathname: "/admin/catalog/products",
    links: [
      {
        title: "Products",
        url: "/admin/catalog/products",
      },
    ],
  },
  {
    pathname: "/admin/catalog/products/add-new",
    links: [
      {
        title: "Products",
        url: "/admin/catalog/products",
      },
      {
        title: "Add product",
        url: "/admin/catalog/products/add-new",
      },
    ],
  },
  {
    pathname: "/admin/catalog/inventory",
    links: [
      {
        title: "Inventory",
        url: "/admin/catalog/inventory",
      },
    ],
  },
  {
    pathname: "/admin/sales/orders",
    links: [
      {
        title: "Orders",
        url: "/admin/sales/orders",
      },
    ],
  },
];

export default function AdminLayout(props: LayoutProps<"/admin">) {
  const pathname = usePathname();

  const getBreadcrumbs = (path: string): CrumbLink[] => {
    let crumbLinks: CrumbLink[] = [];

    if (pathname.includes("/catalog/")) {
      crumbLinks.push({ title: "Catalog" });
    } else if (pathname.includes("/home/")) {
      crumbLinks.push({ title: "Home" });
    } else if (pathname.includes("/sales/")) {
      crumbLinks.push({ title: "Sales" });
    }
    const findLinks =
      breadcrumbConfig.find((item) => item.pathname === path)?.links ?? [];
    crumbLinks = [...crumbLinks, ...findLinks];
    return crumbLinks;
  };

  const crumbs = getBreadcrumbs(pathname);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                {crumbs.map((crumb, i) => (
                  <Fragment key={crumb.title}>
                    <BreadcrumbItem>
                      <BreadcrumbLink asChild>
                        <Link href={crumb.url ?? ""}>{crumb.title}</Link>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    {crumbs.length > i + 1 && <BreadcrumbSeparator />}
                  </Fragment>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="p-4 md:px-10">{props.children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}

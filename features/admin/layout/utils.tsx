import { Album, Cat, Inbox, List, LucideIcon } from "lucide-react";
export type NavMainType = {
  title: string;
  lists: {
    title: string;
    url: string;
    icon: LucideIcon;
    subLists?: { title: string; url: string }[];
  }[];
};

export const adminSidebarNavItems: NavMainType[] = [
  {
    title: "Home",
    lists: [
      {
        title: "Overviews",
        icon: Album,
        url: "/admin/home/overviews",
      },
    ],
  },
  {
    title: "Catalog",
    lists: [
      {
        title: "Products",
        icon: List,
        url: "/admin/catalog/products",
        subLists: [
          { title: "Add Product", url: "/admin/catalog/products/add-new" },
        ],
      },
      {
        title: "Inventory",
        icon: Inbox,
        url: "/admin/catalog/inventory",
      },
      {
        title: "Categories",
        icon: Cat,
        url: "/admin/catalog/categories",
      },
    ],
  },
  {
    title: "Sales",
    lists: [
      {
        title: "Orders",
        icon: List,
        url: "/admin/sales/orders",
      },
    ],
  },
];

type BreadcrumbItem = {
  title: string;
  url: string;
};

export function useAdminBreadcrumb(
  adminSidebarNavItems: NavMainType[],
  pathname: string,
): BreadcrumbItem[] {
  const exactPathname = pathname.split("?")[0];

  const breadcrumbs: BreadcrumbItem[] = [];

  for (const nav of adminSidebarNavItems) {
    for (const list of nav.lists) {
      if (list.url === exactPathname) {
        breadcrumbs.push(
          { title: nav.title, url: "#" },
          { title: list.title, url: list.url },
        );

        return breadcrumbs;
      }

      if (list.subLists?.length) {
        const matchedSub = list.subLists.find(
          (sub) => sub.url === exactPathname,
        );

        if (matchedSub) {
          breadcrumbs.push(
            { title: nav.title, url: "#" }, // 1️⃣ Main Group
            { title: list.title, url: list.url }, // 2️⃣ Parent Item
            { title: matchedSub.title, url: matchedSub.url }, // 3️⃣ Sub Item
          );

          return breadcrumbs;
        }
      }
    }
  }

  return breadcrumbs;
}

"use client";
import { DataTable } from "@/components/table/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Notebook, Trash } from "lucide-react";
import { Fragment, use } from "react";
import DataTableActionDropdown from "@/components/table/data-table-action-dropdown";
import { getProducts } from "../queries";
import { useSuspenseQuery } from "@tanstack/react-query";

export default function ProductListingTable() {
  const { data: allCourses } = useSuspenseQuery({
    queryKey: ["products"],
    queryFn: () => getProducts(),
  });

  const columns: ColumnDef<Awaited<ReturnType<typeof getProducts>>[number]>[] =
    [
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "costOfGoods",
        header: "Costs of good",
      },
      {
        accessorKey: "price",
        header: "Price",
      },
      {
        accessorKey: "stocks",
        header: "Stocks",
      },
      {
        id: "actions",
        cell: () => (
          <DataTableActionDropdown
            items={[
              {
                dropdownItem: (
                  <Fragment>
                    <Edit /> Edit Course
                  </Fragment>
                ),
                access: {
                  show: "sheet",
                  component: <div>Edit</div>,
                },
              },
              {
                dropdownItem: (
                  <Fragment>
                    <Notebook /> Detail Info
                  </Fragment>
                ),
                access: {
                  show: "link",
                  link: "/admin/status/overviews",
                },
              },
              {
                dropdownItem: (
                  <Fragment>
                    <Trash /> Delete
                  </Fragment>
                ),
                access: {
                  show: "dialog",
                  component: <div>delete</div>,
                },
              },
            ]}
          />
        ),
      },
    ];
  return (
    <div>
      <DataTable columns={columns} data={allCourses} searchBy="name" />
    </div>
  );
}

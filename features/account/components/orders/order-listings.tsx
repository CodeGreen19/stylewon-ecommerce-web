"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useSuspenseQuery } from "@tanstack/react-query";
import Image from "next/image";
import { getOrders } from "../../actions";

export default function OrderListings() {
  const { data: info } = useSuspenseQuery({
    queryKey: ["user-orders"],
    queryFn: () => getOrders(),
  });
  return (
    <div className="w-full space-y-6">
      {info.length === 0 ? (
        <div>No orders you have.</div>
      ) : (
        info.map((order) => (
          <Card
            key={order.id}
            className="rounded-2xl shadow-sm bg-cyan-600 border p-4 hover:shadow-md transition"
          >
            <CardContent className="space-y-4 ">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <div>
                  <h2 className="text-lg font-semibold">
                    Order #{order.id.slice(0, 8)}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Placed on {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <span className="text-sm px-3 py-1 rounded-full bg-gray-100 border font-medium w-fit">
                  {order.status}
                </span>
              </div>

              <div className="grid gap-4">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-4 border rounded-xl p-3"
                  >
                    <div className="flex items-center gap-3">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={50}
                          height={50}
                          className="rounded-lg object-cover"
                        />
                      ) : (
                        <div className="w-[50px] h-[50px] bg-gray-200 rounded-lg" />
                      )}
                      <div>
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-xs text-muted-foreground">
                          Qty: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm font-semibold">
                      ${Number(item.price) * item.quantity}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-end border-t pt-4">
                <p className="text-base font-semibold">
                  Total: ${order.totalAmount}
                </p>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}

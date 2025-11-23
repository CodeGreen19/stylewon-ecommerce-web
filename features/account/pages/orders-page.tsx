import React, { Suspense } from "react";
import { getOrders } from "../actions";
import Heading from "@/features/marketing/components/heading";
import OrderListings from "../components/orders/order-listings";

export default async function OrdersPage() {
  const promise = getOrders();
  return (
    <div>
      <Heading className="text-start">Orders</Heading>
      <Suspense fallback={<div>Loading...</div>}>
        <OrderListings promise={promise} />
      </Suspense>
    </div>
  );
}

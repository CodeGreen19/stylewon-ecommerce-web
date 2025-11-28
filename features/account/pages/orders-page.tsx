import Error from "@/components/shared/error";
import Loading from "@/components/shared/loading";
import { getQueryClient } from "@/tanstack-query/get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { getOrders } from "../actions";
import OrderListings from "../components/orders/order-listings";

export default async function OrdersPage() {
  const qc = getQueryClient();
  void qc.prefetchQuery({
    queryKey: ["user-orders"],
    queryFn: () => getOrders(),
  });
  return (
    <div>
      <HydrationBoundary state={dehydrate(qc)}>
        <ErrorBoundary fallback={<Error />}>
          <Suspense fallback={<Loading />}>
            <OrderListings />
          </Suspense>
        </ErrorBoundary>
      </HydrationBoundary>
    </div>
  );
}

"use client";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { getOrdersItems } from "../actions";

// Mobile Skeleton Item
function MobileSkeletonItem() {
  return (
    <div className="flex gap-4 p-4 border-b border-gray-100 animate-pulse">
      <div className="bg-gray-200 rounded-lg w-20 h-20 " />
      <div className="flex-1 space-y-3 py-1">
        <div className="h-5 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
        <div className="h-6 bg-gray-300 rounded w-28" />
      </div>
    </div>
  );
}

export default function DetailOrdersItems({ orderId }: { orderId: string }) {
  const { isPending, error, data } = useQuery({
    queryKey: ["orders-items", orderId],
    queryFn: () => getOrdersItems({ orderId }),
  });

  // Loading State - Mobile Skeletons
  if (isPending) {
    return (
      <div className="bg-white">
        <div className="px-4 pt-4 pb-2">
          <div className="h-7 bg-gray-200 rounded w-32 animate-pulse" />
        </div>
        {[...Array(4)].map((_, i) => (
          <MobileSkeletonItem key={i} />
        ))}
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="bg-red-50 border-t-4 border-red-500 p-4 text-center">
        <p className="text-red-700 font-medium">Failed to load items</p>
      </div>
    );
  }

  // Empty State
  if (!data || data.length === 0) {
    return (
      <div className="bg-gray-50 text-center py-12">
        <p className="text-gray-500">No items in this order</p>
      </div>
    );
  }

  const totalAmount = data.reduce(
    (sum, item) => sum + item.quantity * Number(item.price),
    0
  );

  return (
    <div className="bg-white mt-4 min-h-screen">
      {/* Header */}
      <div className="px-5 pt-4 pb-3 border-b border-gray-100 sticky top-0 bg-white z-10">
        <h3 className="text-lg font-semibold text-gray-900">Order Items</h3>
        <p className="text-sm text-gray-500 mt-1">
          {data.length} item{data.length > 1 ? "s" : ""}
        </p>
      </div>

      {/* Items List */}
      <div className="divide-y divide-gray-100">
        {data.map((item) => {
          const itemTotal = item.quantity * Number(item.price);

          return (
            <div key={item.id} className="p-4">
              <div className="flex gap-4">
                {/* Product Image */}
                <div className="relative w-20 h-20 bg-gray-100 rounded-xl overflow-hidden  border border-gray-200">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-300">
                      <svg
                        className="w-10 h-10"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 text-base line-clamp-2">
                    {item.name}
                  </h4>

                  <div className="mt-2 space-y-1">
                    <p className="text-sm text-gray-600">
                      {item.quantity} ×{" "}
                      {Number(item.price).toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </p>
                    <p className="text-base font-semibold text-gray-900">
                      {itemTotal.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Total Summary - Sticky Bottom */}
      <div className="sticky bottom-0 bg-white border-t border-gray-200 px-5 py-4 mt-4">
        <div className="flex justify-between items-center">
          <span className="text-base font-medium text-gray-700">
            Total Amount
          </span>
          <span className="text-xl font-bold text-gray-900">
            {totalAmount.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </span>
        </div>
      </div>
    </div>
  );
}

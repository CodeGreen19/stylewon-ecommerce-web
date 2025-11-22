import { Suspense } from "react";
import { getBillingsInfo } from "../actions";
import CheckoutForm from "../components/checkout/checkout-form";

export default function CheckoutPage() {
  const promsie = getBillingsInfo();
  return (
    <div className="min-h-screen max-w-5xl m-auto p-4 ">
      <Suspense fallback={<div>Loading...</div>}>
        <CheckoutForm promise={promsie} />
      </Suspense>
    </div>
  );
}

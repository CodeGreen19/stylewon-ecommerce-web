"use client";

import CustomFormField from "@/components/form/custom-form-field";
import CustomFormSubmitBtn from "@/components/form/custom-form-submit-btn";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { getBillingsInfo, updateBillingsInfo } from "../../actions";
import { useCartItems } from "../../hooks/use-cart-items";
import {
  billingSchema,
  BillingSchemaShape,
  BillingSchemaType,
} from "../../schemas";

export default function CheckoutForm({
  promise,
}: {
  promise: ReturnType<typeof getBillingsInfo>;
}) {
  const [total, setTotal] = useState<number>(0);
  const billings = use(promise);
  const router = useRouter();
  const { cart } = useCartItems();
  const form = useForm<BillingSchemaType>({
    resolver: zodResolver(billingSchema),
    defaultValues: {
      fullName: billings ? billings.fullName : "",
      address: billings ? billings.address : "",
      phone: billings ? billings.phone : "",
    },
  });
  const isPending = form.formState.isSubmitting;
  const onSubmit = async (inputs: BillingSchemaType) => {
    await updateBillingsInfo(inputs);
    router.refresh();
    toast.success("Billings info updated");
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (cart) {
        setTotal(
          cart.reduce(
            (prev, current) => prev + current.price * current.quantity,
            0
          )
        );
      }
    }
  }, [cart]);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <CustomFormField<BillingSchemaShape>
            form={form}
            input="text"
            name="fullName"
            title="Fullname"
          />
          <CustomFormField<BillingSchemaShape>
            form={form}
            input="number"
            name="phone"
            title="Phone"
          />
          <CustomFormField<BillingSchemaShape>
            form={form}
            input="text"
            name="address"
            title="Address"
          />
          <div>
            <h2 className="text-end text-2xl font-bold">total : {total}</h2>
          </div>
          <CustomFormSubmitBtn isPending={isPending}>
            Palace order
          </CustomFormSubmitBtn>
        </form>
      </Form>
    </div>
  );
}

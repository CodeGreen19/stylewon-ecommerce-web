"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { LoadingSwap } from "@/components/ui/loading-swap";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import {
  getBillingsInfo,
  placeOrder,
  updateBillingsInfo,
} from "../../server/actions";
import { useCartItems } from "../../hooks/use-cart-items";
import { billingSchema, BillingSchemaType } from "../../schemas";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function CheckoutForm() {
  const router = useRouter();
  const {
    data: { totalAmount, billings },
  } = useSuspenseQuery({
    queryKey: ["billings"],
    queryFn: () => getBillingsInfo(),
  });
  const { carts, setCarts } = useCartItems();

  const form = useForm<BillingSchemaType>({
    resolver: zodResolver(billingSchema),
    defaultValues: {
      fullName: billings ? billings.fullName : "",
      address: billings ? (billings.address ?? "") : "",
      phone: billings ? billings.phone : "",
    },
  });

  const { isPending, mutate } = useMutation({
    mutationFn: async (inputs: BillingSchemaType) => {
      await updateBillingsInfo(inputs);
      await placeOrder({ carts });
      // setCarts([]);
      toast.success("Order placed");
      // router.push("/account/orders");
    },
  });

  return (
    <Card className="m-auto max-w-md bg-cyan-800">
      <CardHeader>
        <CardTitle>Billings & Shipping</CardTitle>
        <CardDescription>
          Add or update info for billings & shippings
        </CardDescription>
      </CardHeader>
      <CardContent className=" ">
        <form onSubmit={form.handleSubmit((v) => mutate(v))}>
          <FieldGroup>
            <Controller
              name="fullName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Name</FieldLabel>
                  <Input aria-invalid={fieldState.invalid} {...field} />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="phone"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Phone No.</FieldLabel>
                  <Input aria-invalid={fieldState.invalid} {...field} />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="address"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Address</FieldLabel>
                  <Input aria-invalid={fieldState.invalid} {...field} />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Field>
              <FieldContent className="text-xl font-bold">
                Total Price: {totalAmount} &#x09F3;
                {/* {carts.reduce((prev, curr) => prev + curr.price, 0)} &#x09F3; */}
              </FieldContent>
            </Field>
            <Field orientation={"vertical"} className="justify-end">
              <Button disabled={isPending}>
                <LoadingSwap isLoading={isPending}>Submit</LoadingSwap>
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}

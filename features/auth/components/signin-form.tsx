"use client";

import CustomFormField from "@/components/form/custom-form-field";
import CustomFormSubmitBtn from "@/components/form/custom-form-submit-btn";
import { Form } from "@/components/ui/form";
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { signinSchema, SigninSchemaType } from "../schemas";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { LoadingSwap } from "@/components/ui/loading-swap";

export default function SigninForm({
  closeDialog,
}: {
  closeDialog: () => void;
}) {
  const form = useForm<SigninSchemaType>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { isPending, mutate } = useMutation({
    mutationFn: async (input: SigninSchemaType) => {
      const res = await authClient.signIn.email(input);
      if (res.data) {
        toast.success("Signin success");
        closeDialog();
      }
      if (res.error) {
        toast.error(res.error.message || res.error.statusText);
      }
    },
  });

  return (
    <form onSubmit={form.handleSubmit((v) => mutate(v))}>
      <FieldGroup className="gap-4">
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Email address</FieldLabel>
              <Input aria-invalid={fieldState.invalid} {...field} />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Password</FieldLabel>
              <Input aria-invalid={fieldState.invalid} {...field} />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Field orientation={"horizontal"} className="justify-end">
          <Button className="rounded-full" disabled={isPending}>
            <LoadingSwap isLoading={isPending}>Submit</LoadingSwap>
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}

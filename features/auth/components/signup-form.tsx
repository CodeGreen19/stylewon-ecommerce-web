"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { LoadingSwap } from "@/components/ui/loading-swap";
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { signupSchema, SignupSchemaType } from "../schemas";

export default function SigninForm({
  closeDialog,
}: {
  closeDialog: () => void;
}) {
  const form = useForm<SignupSchemaType>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const { isPending, mutate } = useMutation({
    mutationFn: async (input: SignupSchemaType) => {
      const res = await authClient.signUp.email(input);
      if (res.data) {
        toast.success("Signup success");
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
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Full name</FieldLabel>
              <Input aria-invalid={fieldState.invalid} {...field} />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
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

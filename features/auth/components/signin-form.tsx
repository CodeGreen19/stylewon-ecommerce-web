"use client";

import CustomFormField from "@/components/form/custom-form-field";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { signinSchema, SigninSchemaShape, SigninSchemaType } from "../schemas";
import { Button } from "@/components/ui/button";
import { LoadingSwap } from "@/components/ui/loading-swap";
import CustomFormSubmitBtn from "@/components/form/custom-form-submit-btn";
import { authClient } from "@/lib/auth-client";

export default function SigninForm({
  closeDialog,
}: {
  closeDialog: () => void;
}) {
  const router = useRouter();
  const form = useForm<SigninSchemaType>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const isPending = form.formState.isSubmitting;

  const onSubmit = async (inputs: SigninSchemaType) => {
    const res = await authClient.signIn.email(inputs);
    if (res.data) {
      toast.success("Signed in successfully");
      closeDialog();
    }
    if (res.error) {
      toast.error(res.error.message || res.error.statusText);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <CustomFormField<SigninSchemaShape>
          form={form}
          input="email"
          name="email"
          title="Email address"
          required
        />
        <CustomFormField<SigninSchemaShape>
          form={form}
          input="text"
          name="password"
          title="Password"
          required
        />
        <CustomFormSubmitBtn isPending={isPending}>Submit</CustomFormSubmitBtn>
      </form>
    </Form>
  );
}

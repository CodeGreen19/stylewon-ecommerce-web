"use client";

import CustomFormField from "@/components/form/custom-form-field";
import CustomFormSubmitBtn from "@/components/form/custom-form-submit-btn";
import { Form } from "@/components/ui/form";
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { signupSchema, SignupSchemaShape, SignupSchemaType } from "../schemas";

export default function SignupForm({
  closeDialog,
}: {
  closeDialog: () => void;
}) {
  const router = useRouter();
  const form = useForm<SignupSchemaType>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const isPending = form.formState.isSubmitting;

  const onSubmit = async (inputs: SignupSchemaType) => {
    const res = await authClient.signUp.email(inputs);
    if (res.data) {
      toast.success("Signed up successfully");
      closeDialog();
    }
    if (res.error) {
      toast.error(res.error.message || res.error.statusText);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <CustomFormField<SignupSchemaShape>
          form={form}
          input="text"
          name="name"
          title="Full name"
          required
        />
        <CustomFormField<SignupSchemaShape>
          form={form}
          input="email"
          name="email"
          title="Email address"
          required
        />
        <CustomFormField<SignupSchemaShape>
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

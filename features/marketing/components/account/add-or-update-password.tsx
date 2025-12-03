"use client";

import { ButtonWithLoading } from "@/components/shared/button-with-loading";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useMutation } from "@tanstack/react-query";
import { AlertCircle } from "lucide-react";
import Countdown from "react-countdown";
import { toast } from "sonner";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { LoadingSwap } from "@/components/ui/loading-swap";
import { useEffect, useState } from "react";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { PasswordInput } from "@/components/ui/password-input";
import {
  addPasswordSchema,
  AddPasswordSchemaType,
  updatePasswordSchema,
  UpdatePasswordSchemaType,
} from "@/features/auth/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { createAccountIfNeeded } from "../../server/account.action";
import { getQueryClient } from "@/tanstack-query/get-query-client";
import z from "zod";

type CompType = "SEND" | "VERIFY" | "UPDATE";
export default function AddOrUpdatePassword({
  email,
  type,
}: {
  email: string;
  type: "ADD" | "UPDATE";
}) {
  const [selected, setSelected] = useState<CompType>("SEND");
  return (
    <div>
      {type === "ADD" ? (
        selected === "SEND" ? (
          <SendVerficationOTP switchTo={setSelected} email={email} />
        ) : selected === "VERIFY" ? (
          <OTPVerifyForm switchTo={setSelected} email={email} />
        ) : selected === "UPDATE" ? (
          <AddPassword />
        ) : null
      ) : (
        <UpdatePassword />
      )}
    </div>
  );
}

export function SendVerficationOTP({
  email,
  switchTo,
}: {
  email: string;
  switchTo: (v: CompType) => void;
}) {
  const { isPending, mutate } = useMutation({
    mutationFn: async () => {
      const res = await authClient.emailOtp.sendVerificationOtp({
        email,
        type: "email-verification",
      });

      if (res.data) {
        toast.success("OTP has sent");
        switchTo("VERIFY");
      }
      if (res.error) {
        toast.error(res.error.message || res.error.statusText);
      }
    },
  });

  return (
    <div className="flex flex-col items-center gap-4">
      <Button variant={"secondary"} className="text-destructive">
        <AlertCircle /> Verification required
      </Button>
      <h2 className="text-xl font-semibold">{email}</h2>
      <ButtonWithLoading isPending={isPending} onClick={() => mutate()}>
        Send OTP
      </ButtonWithLoading>
    </div>
  );
}

export function OTPVerifyForm({
  email,
  switchTo,
}: {
  email: string;
  switchTo: (v: CompType) => void;
}) {
  const [value, setValue] = useState("");
  const [data, setData] = useState(() => Date.now() + 1000 * 30);

  const submitMutation = useMutation({
    mutationFn: async () => {
      const res = await authClient.emailOtp.verifyEmail({
        email,
        otp: value,
      });
      if (res.data) {
        toast.success("OTP is varified");
        await createAccountIfNeeded();
        switchTo("UPDATE");
      }
      if (res.error) {
        toast.error(res.error.message || res.error.statusText);
      }
    },
  });

  const resendMutation = useMutation({
    mutationFn: async () => {
      const res = await authClient.emailOtp.sendVerificationOtp({
        email,
        type: "email-verification",
      });
      setValue("");
      if (res.data) {
        toast.success("OTP has sent again");
      }
      if (res.error) {
        toast.error(res.error.message || res.error.statusText);
      }
    },

    onSuccess: () => {
      setData(Date.now() + 1000 * 30);
    },
  });

  useEffect(() => {
    if (value.length === 6) {
      submitMutation.mutate();
    }
  }, [value]);

  return (
    <div className="mt-10 flex flex-col items-center gap-6">
      <h2>we have send an OTP to {email}</h2>
      <InputOTP
        disabled={submitMutation.isPending}
        value={value}
        onChange={setValue}
        maxLength={6}
      >
        <InputOTPGroup className="w-full gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <InputOTPSlot
              key={i}
              className="h-12 w-12 rounded-sm border"
              index={i}
            />
          ))}
        </InputOTPGroup>
      </InputOTP>

      <div>
        <LoadingSwap isLoading={resendMutation.isPending}>
          <Countdown
            key={data}
            date={data}
            renderer={({ minutes, seconds, completed }) => {
              if (completed) {
                return (
                  <div
                    onClick={(e) => {
                      resendMutation.mutate();
                    }}
                    className="underline"
                  >
                    Resend
                  </div>
                );
              } else {
                return (
                  <span className="font-bold">
                    {minutes} : {seconds}
                  </span>
                );
              }
            }}
          />
        </LoadingSwap>
      </div>
      <ButtonWithLoading
        disabled={submitMutation.isPending}
        type="submit"
        className="h-10 w-full"
      >
        Submit{" "}
      </ButtonWithLoading>
    </div>
  );
}

export function AddPassword({ onClose }: { onClose?: () => void }) {
  const qc = getQueryClient();
  const form = useForm<AddPasswordSchemaType>({
    resolver: zodResolver(addPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const { isPending, mutate } = useMutation({
    mutationFn: async (input: AddPasswordSchemaType) => {
      const res = await authClient.changePassword({
        currentPassword: "passcode",
        newPassword: input.password,
      });

      if (res.data) {
        onClose && onClose();
        toast.success("Password updated");
        await qc.invalidateQueries({ queryKey: ["user-info"] });
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
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>New password</FieldLabel>
              <PasswordInput
                className="h-10"
                aria-invalid={fieldState.invalid}
                {...field}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="confirmPassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Confirm password</FieldLabel>
              <PasswordInput
                className="h-10"
                aria-invalid={fieldState.invalid}
                {...field}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Field>
          <Button className="h-10" disabled={isPending}>
            <LoadingSwap isLoading={isPending}>Submit</LoadingSwap>
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}

export function UpdatePassword({ onClose }: { onClose?: () => void }) {
  const qc = getQueryClient();
  const form = useForm<UpdatePasswordSchemaType>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      oldPassword: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { isPending, mutate } = useMutation({
    mutationFn: async (input: UpdatePasswordSchemaType) => {
      const res = await authClient.changePassword({
        currentPassword: input.oldPassword,
        newPassword: input.password,
      });

      if (res.data) {
        onClose && onClose();
        toast.success("Password updated");
        await qc.invalidateQueries({ queryKey: ["user-info"] });
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
          name="oldPassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Current password</FieldLabel>
              <PasswordInput
                className="h-10"
                aria-invalid={fieldState.invalid}
                {...field}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>New password</FieldLabel>
              <PasswordInput
                className="h-10"
                aria-invalid={fieldState.invalid}
                {...field}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="confirmPassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Confirm password</FieldLabel>
              <PasswordInput
                className="h-10"
                aria-invalid={fieldState.invalid}
                {...field}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Field>
          <Button className="h-10" disabled={isPending}>
            <LoadingSwap isLoading={isPending}>Submit</LoadingSwap>
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}

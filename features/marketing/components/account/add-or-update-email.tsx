"use client";

import { ButtonWithLoading } from "@/components/shared/button-with-loading";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useMutation } from "@tanstack/react-query";
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
import { Input } from "@/components/ui/input";
import { getQueryClient } from "@/tanstack-query/get-query-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { bdPhoneRegex } from "../../schemas/account.schema";
import { addPhoneNumber } from "../../server/account.action";

const sendOTPschema = z.object({
  email: z.email("Invalid phone number"),
});

export default function AddOrUpdateEmail({ email }: { email: string }) {
  return <div>{email ? <EmailUpdate email={email} /> : <PhoneAdd />}</div>;
}

function EmailUpdate({ email }: { email: string }) {
  const [type, setType] = useState<CompType>("SEND");
  const [newEmail, setNewEmail] = useState(email);
  return (
    <div>
      {type === "SEND" ? (
        <SendOTPToChange
          defaultNumber={newPhoneNo}
          setPhoneNumber={setNewPhoneNo}
          switchTo={setType}
        />
      ) : type === "VERIFY" ? (
        <OTPVerifyToChangePhoneNumber phoneNo={newPhoneNo} switchTo={setType} />
      ) : null}
    </div>
  );
}

type CompType = "SEND" | "VERIFY";
// update phone number
function PhoneAdd() {
  const [type, setType] = useState<CompType>("SEND");
  const [newEmail, setNewEmail] = useState("");
  return (
    <div>
      {type === "SEND" ? (
        <SendOTP setPhoneNumber={setNewPhoneNo} switchTo={setType} />
      ) : type === "VERIFY" ? (
        <OTPVerifyForm phoneNo={newPhoneNo} switchTo={setType} />
      ) : null}
    </div>
  );
}

export function SendOTPToChange({
  switchTo,
  defaultEmail,
  setEmail,
}: {
  switchTo: (v: CompType) => void;
  setEmail: (v: string) => void;
  defaultEmail: string;
}) {
  const form = useForm<z.infer<typeof sendOTPschema>>({
    resolver: zodResolver(sendOTPschema),
    defaultValues: {
      email: defaultEmail,
    },
  });

  const { isPending, mutate } = useMutation({
    mutationFn: async (input: z.infer<typeof sendOTPschema>) => {
      if (defaultNumber === input.phoneNo) {
        return toast.info("you keep the same phone number");
      }
      const res = await authClient.phoneNumber.sendOtp({
        phoneNumber: input.phoneNo,
      });

      if (res.data) {
        setPhoneNumber(input.phoneNo);
        toast.success("OTP has sent");
        switchTo("VERIFY");
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
              <FieldLabel>Email Address</FieldLabel>
              <Input
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
            <LoadingSwap isLoading={isPending}>Send OTP</LoadingSwap>
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
export function OTPVerifyToChangePhoneNumber({
  phoneNo,
  switchTo,
}: {
  phoneNo: string;
  switchTo: (v: CompType) => void;
}) {
  const qc = getQueryClient();
  const [value, setValue] = useState("");
  const [data, setData] = useState(() => Date.now() + 1000 * 30);

  const submitMutation = useMutation({
    mutationFn: async () => {
      const res = await authClient.phoneNumber.verify({
        phoneNumber: phoneNo,
        code: value,
        updatePhoneNumber: true,
      });
      if (res.data) {
        toast.success("OTP is varified");
        await qc.invalidateQueries({ queryKey: ["user-info"] });
      }
      if (res.error) {
        toast.error(res.error.message || res.error.statusText);
      }
    },
  });

  const resendMutation = useMutation({
    mutationFn: async () => {
      const res = await authClient.phoneNumber.sendOtp({
        phoneNumber: phoneNo,
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
      <h2>we have send an OTP to {phoneNo}</h2>
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

export function SendOTP({
  switchTo,
  setNewEmail,
}: {
  switchTo: (v: CompType) => void;
  setNewEmail: (v: string) => void;
}) {
  const form = useForm<z.infer<typeof sendOTPschema>>({
    resolver: zodResolver(sendOTPschema),
    defaultValues: {
      email: "",
    },
  });

  const { isPending, mutate } = useMutation({
    mutationFn: async (input: z.infer<typeof sendOTPschema>) => {
      const res = await authClient.phoneNumber.sendOtp({
        phoneNumber: input.phoneNo,
      });

      if (res.data) {
        setNewEmail(input.phoneNo);
        toast.success("OTP has sent");
        switchTo("VERIFY");
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
              <FieldLabel>Email Address</FieldLabel>
              <Input
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
            <LoadingSwap isLoading={isPending}>Send OTP</LoadingSwap>
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
export function OTPVerifyForm({
  phoneNo,
  switchTo,
}: {
  phoneNo: string;
  switchTo: (v: CompType) => void;
}) {
  const qc = getQueryClient();
  const [value, setValue] = useState("");
  const [data, setData] = useState(() => Date.now() + 1000 * 30);

  const submitMutation = useMutation({
    mutationFn: async () => {
      const res = await authClient.phoneNumber.verify({
        phoneNumber: phoneNo,
        code: value,
      });
      if (res.data) {
        toast.success("OTP is varified");
        await qc.invalidateQueries({ queryKey: ["user-info"] });
      }
      if (res.error) {
        toast.error(res.error.message || res.error.statusText);
      }
    },
  });

  const resendMutation = useMutation({
    mutationFn: async () => {
      const res = await authClient.phoneNumber.sendOtp({
        phoneNumber: phoneNo,
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
      <h2>we have send an OTP to {phoneNo}</h2>
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

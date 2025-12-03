"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { LoadingSwap } from "@/components/ui/loading-swap";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";
import { getQueryClient } from "@/tanstack-query/get-query-client";

import { addPhoneNumber, getUserInfo } from "../../server/account.action";

import Countdown from "react-countdown";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Fragment, useEffect, useState } from "react";

import { ButtonWithLoading } from "@/components/shared/button-with-loading";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, RefreshCcw } from "lucide-react";
import z from "zod";
import { bdPhoneRegex } from "../../schemas/account.schema";
import AddOrUpdatePassword from "./add-or-update-password";
import { ProfileInfoSectionWrapper } from "./personal-info-section-wrapper";
import AddOrUpdatePhoneNo from "./add-or-update-phone-number";
import { AddOrUpdateName } from "./add-or-update-name.tsx";

export function PersonalInfo() {
  const { data } = useSuspenseQuery({
    queryKey: ["user-info"],
    queryFn: () => getUserInfo(),
  });

  return (
    <Card className="rounded-sm">
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
      </CardHeader>
      <CardContent>
        <FieldGroup>
          <Field>
            <ProfileInfoSectionWrapper
              buttonType={data.name ? "CHANGE" : "ADD"}
              buttonValue={{ add: "Add name", change: "Update name" }}
              label="Full name"
              value={data.name}
            >
              <AddOrUpdateName name={data.name} />
            </ProfileInfoSectionWrapper>
          </Field>
          <FieldSeparator />
          <Field>
            <ProfileInfoSectionWrapper
              buttonType={data.email ? "CHANGE" : "ADD"}
              buttonValue={{
                add: "Add email address",
                change: "Change email address",
              }}
              label="Email address"
              value={data.email}
            >
              <div>works</div>
            </ProfileInfoSectionWrapper>
          </Field>
          <FieldSeparator />
          <Field>
            <ProfileInfoSectionWrapper
              buttonType={data.phoneNumber ? "CHANGE" : "ADD"}
              buttonValue={{
                add: "Add phone number",
                change: "Change phone number",
              }}
              label="Phone number"
              value={data.phoneNumber ?? ""}
            >
              <AddOrUpdatePhoneNo phoneNumber={data.phoneNumber ?? ""} />
            </ProfileInfoSectionWrapper>
          </Field>
          <FieldSeparator />
          <Field>
            <ProfileInfoSectionWrapper
              buttonType={data.isPasswordAccountExist ? "CHANGE" : "ADD"}
              buttonValue={{
                add: "Add new password",
                change: "Update password",
              }}
              label="Password"
              value={"********"}
            >
              <AddOrUpdatePassword
                type={data.isPasswordAccountExist ? "UPDATE" : "ADD"}
                email={data.email}
              />
            </ProfileInfoSectionWrapper>
          </Field>
        </FieldGroup>
      </CardContent>
    </Card>
  );
}

// name update ...............................................
const nameSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 char"),
});

function NameAndUpdate({ name }: { name: string }) {
  const qc = getQueryClient();
  const form = useForm<z.infer<typeof nameSchema>>({
    resolver: zodResolver(nameSchema),
    defaultValues: {
      name,
    },
    mode: "onChange",
  });
  const { isPending, mutate } = useMutation({
    mutationFn: async (input: z.infer<typeof nameSchema>) => {
      const res = await authClient.updateUser({ name: input.name });

      if (res.data) {
        toast.success("Name is updated");
        await qc.invalidateQueries({ queryKey: ["user-info"] });
      }
      if (res.error) {
        toast.error(res.error.message || res.error.statusText);
      }
    },
  });

  return (
    <form onSubmit={form.handleSubmit((v) => mutate(v))}>
      <Controller
        name="name"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>Name</FieldLabel>
            <div className="flex gap-2">
              <Input
                className="h-10"
                aria-invalid={fieldState.invalid}
                {...field}
              />
              <ButtonWithLoading
                isPending={isPending}
                className="h-10 self-end"
              >
                Update
              </ButtonWithLoading>
            </div>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </form>
  );
}

// name email ...............................................
const emailSchema = z.object({
  email: z.email("Enter a valid email address"),
});

function EmailAndUpdate({ email }: { email: string }) {
  const qc = getQueryClient();
  const form = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email,
    },
    mode: "onChange",
  });
  const { isPending, mutate } = useMutation({
    mutationFn: async (input: z.infer<typeof emailSchema>) => {
      // const res = await authClient.updateUser({ name: input.name });
      // if (res.data) {
      //   toast.success("Name is updated");
      //   await qc.invalidateQueries({ queryKey: ["user-info"] });
      // }
      // if (res.error) {
      //   toast.error(res.error.message || res.error.statusText);
      // }
    },
  });

  return (
    <form onSubmit={form.handleSubmit((v) => mutate(v))}>
      <Controller
        name="email"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>Email address</FieldLabel>
            <div className="flex gap-2">
              <Input
                className="h-10"
                aria-invalid={fieldState.invalid}
                {...field}
              />
              <ButtonWithLoading
                isPending={isPending}
                className="h-10 self-end"
              >
                Update
              </ButtonWithLoading>
            </div>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </form>
  );
}
// name phone number update ...............................................
const phoneNoSchema = z.object({
  phoneNo: z
    .string()
    .refine((v) => bdPhoneRegex.test(v), "Enter a valid phone number"),
});

function PhoneNumberAdd() {
  const qc = getQueryClient();
  const [open, setOpen] = useState(false);
  const [sendOtp, setSendOtp] = useState(false);
  const form = useForm<z.infer<typeof phoneNoSchema>>({
    resolver: zodResolver(phoneNoSchema),
    defaultValues: {
      phoneNo: "",
    },
    mode: "onChange",
  });
  const { isPending, mutate } = useMutation({
    mutationFn: async (input: z.infer<typeof phoneNoSchema>) => {
      const exist = await addPhoneNumber({ phoneNo: input.phoneNo });
      if (exist) {
        return toast.error("Phone number already in use");
      }
      const res = await authClient.phoneNumber.sendOtp({
        phoneNumber: input.phoneNo,
      });
      if (res.data) {
        toast.success("OTP has sent");
        setSendOtp(true);
      }
      if (res.error) {
        toast.error(res.error.message || res.error.statusText);
      }
    },
  });

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        setSendOtp(false);
        form.reset();
      }}
    >
      <div>
        <div className="flex w-full flex-row items-center gap-4">
          <h1 className="text-sm font-semibold">Phone Number </h1>
          <DialogTrigger asChild>
            <Button variant={"outline"}>
              <Plus /> Add phone number
            </Button>
          </DialogTrigger>
        </div>
      </div>

      <DialogContent className="min-h-1/2">
        {!sendOtp ? (
          <Fragment>
            <DialogHeader>
              <DialogTitle>Add new phone number </DialogTitle>
            </DialogHeader>
            <form
              onSubmit={form.handleSubmit((v) => mutate(v))}
              className="mt-10 flex flex-col gap-4"
            >
              <Controller
                name="phoneNo"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Phone Number</FieldLabel>
                    <Input
                      className="h-10"
                      aria-invalid={fieldState.invalid}
                      {...field}
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <ButtonWithLoading
                isPending={isPending}
                className="h-10 self-end"
              >
                Send OTP vis SMS
              </ButtonWithLoading>
            </form>
          </Fragment>
        ) : (
          <PhoneNumberAddVerify
            phoneNo={form.getValues("phoneNo")}
            onClose={() => setOpen(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

function PhoneNumberAddVerify({
  phoneNo,
  onClose,
}: {
  onClose: () => void;
  phoneNo: string;
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
        await qc.invalidateQueries({ queryKey: ["user-info"] });
        toast.success("Phone number is added");
        onClose();
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
  useEffect(() => {
    setData(Date.now() + 1000 * 30);
  }, []);

  return (
    <Fragment>
      <DialogHeader>
        <DialogTitle>Verify OTP</DialogTitle>
      </DialogHeader>
      <div className="mt-10 flex flex-col items-center gap-6">
        <h2>
          we have send an OTP to {phoneNo.substring(0, 3)}*****
          {phoneNo.substring(phoneNo.length - 2)}
        </h2>
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
        <ButtonWithLoading isPending={submitMutation.isPending}>
          Verify
        </ButtonWithLoading>
      </div>
    </Fragment>
  );
}

// name email ...............................................
const phoneChangeSchema = z.object({
  phoneNo: z
    .string()
    .refine((v) => bdPhoneRegex.test(v), "Enter a valid phone number"),
});

function PhoneNumberChange({ phoneNo }: { phoneNo: string }) {
  const qc = getQueryClient();
  const [open, setOpen] = useState(false);
  const [sendOtp, setSendOtp] = useState(false);
  const form = useForm<z.infer<typeof phoneChangeSchema>>({
    resolver: zodResolver(phoneChangeSchema),
    defaultValues: {
      phoneNo,
    },
    mode: "onChange",
  });
  const { isPending, mutate } = useMutation({
    mutationFn: async (input: z.infer<typeof phoneChangeSchema>) => {
      // const exist = await addPhoneNumber({ phoneNo: input.phoneNo });
      // if (exist) {
      //   return toast.error("Phone number already in use");
      // }
      const res = await authClient.phoneNumber.sendOtp({
        phoneNumber: phoneNo,
      });
      if (res.data) {
        toast.success("OTP has sent");
        setSendOtp(true);
      }
      if (res.error) {
        toast.error(res.error.message || res.error.statusText);
      }
    },
  });

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        setSendOtp(false);
        form.reset();
      }}
    >
      <div>
        <h1 className="text-sm font-semibold">Phone Number </h1>
        <div className="flex w-full flex-row items-center gap-4">
          <Badge>{phoneNo}</Badge>
          <DialogTrigger asChild>
            <Button variant={"outline"}>
              <RefreshCcw /> Change phone number
            </Button>
          </DialogTrigger>
        </div>
      </div>

      <DialogContent className="min-h-1/2">
        {!sendOtp ? (
          <Fragment>
            <DialogHeader>
              <DialogTitle>Change phone number</DialogTitle>
            </DialogHeader>
            <form
              onSubmit={form.handleSubmit((v) => mutate(v))}
              className="mt-10 flex flex-col gap-4"
            >
              <Controller
                name="phoneNo"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Phone Number</FieldLabel>
                    <Input
                      className="h-10"
                      aria-invalid={fieldState.invalid}
                      {...field}
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <ButtonWithLoading
                isPending={isPending}
                className="h-10 self-end"
              >
                Send OTP vis SMS
              </ButtonWithLoading>
            </form>
          </Fragment>
        ) : (
          <PhoneChangeOTPverify
            phoneNo={form.getValues("phoneNo")}
            onClose={() => setOpen(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

function PhoneChangeOTPverify({
  phoneNo,
  onClose,
}: {
  onClose: () => void;
  phoneNo: string;
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
        await qc.invalidateQueries({ queryKey: ["user-info"] });
        toast.success("Phone number is added");
        onClose();
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
  useEffect(() => {
    setData(Date.now() + 1000 * 30);
  }, []);

  return (
    <Fragment>
      <DialogHeader>
        <DialogTitle>Verify OTP</DialogTitle>
      </DialogHeader>
      <div className="mt-10 flex flex-col items-center gap-6">
        <h2>
          we have send an OTP to {phoneNo.substring(0, 3)}*****
          {phoneNo.substring(phoneNo.length - 2)}
        </h2>
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
        <ButtonWithLoading isPending={submitMutation.isPending}>
          Verify
        </ButtonWithLoading>
      </div>
    </Fragment>
  );
}

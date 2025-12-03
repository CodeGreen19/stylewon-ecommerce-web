"use client";

import Countdown from "react-countdown";

import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { LoadingSwap } from "@/components/ui/loading-swap";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useAuthStore } from "../hooks/use-auth-hook";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { CompType } from "../schemas";

export function OTPVerifyForm({
  switchTo,
}: {
  switchTo: (v: CompType) => void;
}) {
  const [value, setValue] = useState("");
  const [data, setData] = useState(() => Date.now() + 1000 * 30);
  const { signupSigninPhoneNo } = useAuthStore();

  const submitMutation = useMutation({
    mutationFn: async () => {
      const res = await authClient.phoneNumber.verify({
        phoneNumber: signupSigninPhoneNo,
        code: value,
      });
      if (res.data) {
        toast.success("OTP is varified");
        switchTo("ADD_PASSWORD");
      }
      if (res.error) {
        toast.error(res.error.message || res.error.statusText);
      }
    },
  });

  const resendMutation = useMutation({
    mutationFn: async () => {
      const res = await authClient.phoneNumber.sendOtp({
        phoneNumber: signupSigninPhoneNo,
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
      <h2>
        we have send an OTP to {signupSigninPhoneNo.substring(0, 3)}*****
        {signupSigninPhoneNo.substring(signupSigninPhoneNo.length - 2)}
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
      <Button
        disabled={submitMutation.isPending}
        type="submit"
        className="h-10 w-full"
      >
        <LoadingSwap isLoading={submitMutation.isPending}>Submit </LoadingSwap>
      </Button>
    </div>
  );
}

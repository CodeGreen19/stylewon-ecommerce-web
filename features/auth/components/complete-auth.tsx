import React, { useState } from "react";
import { SignUpForm } from "./signup-form";
import {
  Field,
  FieldContent,
  FieldGroup,
  FieldTitle,
} from "@/components/ui/field";
import { SignInForm } from "./signin-form";
import { CompType } from "../schemas";
import { OTPVerifyForm } from "./otp-verity";
import { AddPassword } from "./add-password";
import { ForgotPassword } from "./forgot-password";
import { ResetPassword } from "./reset-password";

export default function CompleteAuth({ onClose }: { onClose?: () => void }) {
  const [showComp, setShowComp] = useState<CompType>("SIGN_IN");
  return (
    <div>
      <FieldGroup>
        {showComp === "SIGN_UP" ? (
          <Field>
            <FieldTitle className="text-xl font-bold">Sign Up</FieldTitle>
            <FieldContent>
              <SignUpForm switchTo={setShowComp} />
            </FieldContent>
          </Field>
        ) : showComp === "SIGN_IN" ? (
          <Field>
            <FieldTitle className="text-xl font-bold">Sign In</FieldTitle>
            <FieldContent>
              <SignInForm onClose={onClose} switchTo={setShowComp} />
            </FieldContent>
          </Field>
        ) : showComp === "OTP_VERIFY" ? (
          <Field>
            <FieldTitle className="text-xl font-bold">OTP Verify</FieldTitle>
            <FieldContent>
              <OTPVerifyForm switchTo={setShowComp} />
            </FieldContent>
          </Field>
        ) : showComp === "ADD_PASSWORD" ? (
          <Field>
            <FieldTitle className="text-xl font-bold">Add Password</FieldTitle>
            <FieldContent>
              <AddPassword onClose={onClose} />
            </FieldContent>
          </Field>
        ) : showComp === "FORGOT_PASSWORD" ? (
          <Field>
            <FieldTitle className="text-xl font-bold">
              Forgot Password
            </FieldTitle>
            <FieldContent>
              <ForgotPassword switchTo={setShowComp} />
            </FieldContent>
          </Field>
        ) : showComp === "RESET_PASSWORD" ? (
          <Field>
            <FieldTitle className="text-xl font-bold">
              Reset Password
            </FieldTitle>
            <FieldContent>
              <ResetPassword switchTo={setShowComp} />
            </FieldContent>
          </Field>
        ) : null}
      </FieldGroup>
    </div>
  );
}

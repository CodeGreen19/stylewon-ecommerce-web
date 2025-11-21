import React, { ComponentProps } from "react";
import { Button } from "../ui/button";
import { LoadingSwap } from "../ui/loading-swap";
import { cn } from "@/lib/utils";

export default function CustomFormSubmitBtn({
  children,
  isPending,
  side,
  ...props
}: ComponentProps<typeof Button> & {
  isPending: boolean;
  side?: "left" | "right";
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-end",
        side && side === "left" ? "justify-start" : ""
      )}
    >
      <Button className="rounded-full px-6" disabled={isPending} {...props}>
        <LoadingSwap isLoading={isPending ?? false}>{children}</LoadingSwap>
      </Button>
    </div>
  );
}

import React from "react";
import { Button } from "../ui/button";
import { LoadingSwap } from "../ui/loading-swap";

export function ButtonWithLoading({
  isPending,
  children,
  ...props
}: React.ComponentProps<typeof Button> & { isPending?: boolean }) {
  return (
    <Button type="submit" disabled={isPending} {...props}>
      <LoadingSwap isLoading={isPending ?? false}>{children}</LoadingSwap>
    </Button>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export default function page() {
  const { isPending, mutate } = useMutation({
    mutationFn: async () => {
      const res = await authClient.changeEmail({
        newEmail: "ahmeddeveloper19s@gmail.com",
      });
      toast.info(JSON.stringify(res));
    },
  });
  return (
    <div>
      <Button disabled={isPending} onClick={() => mutate()}>
        Submit
      </Button>
    </div>
  );
}

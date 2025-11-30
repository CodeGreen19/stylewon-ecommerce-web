"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Fragment, useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SigninForm from "../components/signin-form";
import SignupForm from "../components/signup-form";
import { useCartItems } from "@/features/marketing/hooks/use-cart-items";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { saveCart } from "../action";
import { toast } from "sonner";
import { LoadingSwap } from "@/components/ui/loading-swap";
export default function AuthSignInPage() {
  const router = useRouter();
  const { carts, setCarts } = useCartItems();
  const params = useSearchParams().get("success_redirect_to");
  const [authSuccessAndCartExist, setAuthSuccessAndCartExist] = useState(false);
  const [open, setOpen] = useState(true);
  const closeDialog = () => {
    if (carts.length !== 0) {
      setAuthSuccessAndCartExist(true);
    } else {
      setOpen(false);
    }
  };

  const { isPending, mutate } = useMutation({
    mutationFn: saveCart,
    onSuccess: () => {
      toast.success("cart saved");
      router.push(params ?? "/");
    },
  });
  return (
    <div className="min-h-dvh">
      <Dialog
        open={open}
        onOpenChange={(v) => {
          setOpen(v);
          router.push("/");
        }}
      >
        <DialogTrigger asChild>{null}</DialogTrigger>
        <DialogContent className="max-w-sm noise-bg  bg-cyan-700 border border-cyan-800 space-y-4">
          {authSuccessAndCartExist ? (
            <Fragment>
              <DialogHeader>
                <DialogTitle className="mt-5 text-start">
                  Save your Cart info
                </DialogTitle>
              </DialogHeader>
              <DialogDescription className="flex w-full text-foreground flex-col gap-6">
                click the button below to save or discard cart info.
              </DialogDescription>
              <div className="flex gap-3 my-5">
                <Button
                  onClick={() => {
                    setCarts([]);
                    toast.info("cart if discarded");
                  }}
                  variant={"destructive"}
                >
                  Discard
                </Button>
                <Button
                  onClick={() => mutate({ allCarts: carts })}
                  disabled={isPending}
                >
                  <LoadingSwap isLoading={isPending}>Save</LoadingSwap>{" "}
                </Button>
              </div>
            </Fragment>
          ) : (
            <Fragment>
              <DialogHeader>
                <DialogTitle className="mt-5">
                  Before making checkout login or register
                </DialogTitle>
              </DialogHeader>
              <div className="flex w-full flex-col gap-6">
                <Tabs defaultValue="signin">
                  <TabsList className="rounded-full grid grid-cols-2">
                    <TabsTrigger
                      className="rounded-full data-[state=active]:bg-cyan-600"
                      value="signin"
                    >
                      Login
                    </TabsTrigger>
                    <TabsTrigger
                      className="rounded-full data-[state=active]:bg-cyan-600"
                      value="signup"
                    >
                      Register
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent className="p-2 py-5 " value="signin">
                    <SigninForm closeDialog={closeDialog} />
                  </TabsContent>
                  <TabsContent className="p-2 py-5" value="signup">
                    <SignupForm closeDialog={closeDialog} />
                  </TabsContent>
                </Tabs>
              </div>
            </Fragment>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

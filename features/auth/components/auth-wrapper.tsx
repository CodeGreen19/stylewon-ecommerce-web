"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReactNode, useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SigninForm from "./signin-form";
import SignupForm from "./signup-form";
export default function AuthWrapper({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const closeDialog = () => {
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-sm noise-bg  bg-cyan-700 border border-cyan-800">
        <DialogHeader>
          <DialogTitle></DialogTitle>
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
      </DialogContent>
    </Dialog>
  );
}

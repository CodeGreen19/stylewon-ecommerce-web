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
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle></DialogTitle>
        </DialogHeader>
        <div className="flex w-full  flex-col gap-6">
          <Tabs defaultValue="account">
            <TabsList>
              <TabsTrigger value="signin">Login</TabsTrigger>
              <TabsTrigger value="signup">Register</TabsTrigger>
            </TabsList>
            <TabsContent className="p-2 py-5" value="signin">
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

"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReactNode, useState } from "react";
import CompleteAuth from "./complete-auth";

export function AuthDialogWrapper({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const closeDialog = () => {
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-md border px-10">
        <DialogHeader>
          <DialogTitle></DialogTitle>
        </DialogHeader>
        <CompleteAuth />
      </DialogContent>
    </Dialog>
  );
}

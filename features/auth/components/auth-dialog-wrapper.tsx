"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReactNode, useState } from "react";
import { CompletedAuthBox } from "./completed-auth-box";

export function AuthDialogWrapper({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-md border px-10">
        <DialogHeader>
          <DialogTitle></DialogTitle>
        </DialogHeader>
        <CompletedAuthBox />
      </DialogContent>
    </Dialog>
  );
}

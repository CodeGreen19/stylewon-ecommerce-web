"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FieldGroup } from "@/components/ui/field";
import { Plus } from "lucide-react";
import { useState } from "react";
export function AddProductCateogry() {
  const [open, setOpen] = useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Category</CardTitle>
        <CardDescription>
          Add into diffrent cateogry of this product for better filtering
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FieldGroup className="items-start">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button type="button" className="rounded-full">
                <Plus /> Add Category
              </Button>
            </DialogTrigger>
            <DialogContent className="min-h-[350px]">
              <DialogHeader>
                <DialogTitle></DialogTitle>
                <div>works</div>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </FieldGroup>
      </CardContent>
    </Card>
  );
}

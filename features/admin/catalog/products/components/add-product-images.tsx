"use client";

import { ManageImageWrapper } from "@/components/assert-management/manage-image-wrapper";
import { Button } from "@/components/ui/button";
import { Plus, Trash } from "lucide-react";
import Image from "next/image";
import { UseFormReturn } from "react-hook-form";
import { AddProductSchemaType } from "../schemas";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AddProductImage({
  form,
}: {
  form: UseFormReturn<AddProductSchemaType>;
}) {
  const images = form.watch("images");

  const onSetImages = (selectedImages: string[]) => {
    const existedImages = [...images];
    const marged = [...existedImages, ...selectedImages];
    const unique = Array.from(new Set(marged));
    form.setValue("images", unique);
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Images</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md gap-1 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {images &&
            images.length !== 0 &&
            images.map((image, i) => (
              <div
                key={i}
                className="border relative rounded-md aspect-square overflow-hidden"
              >
                <Image
                  src={image}
                  height={100}
                  width={100}
                  className="w-full object-contain"
                  alt="product-img"
                />
                <Button
                  type="button"
                  onClick={() => {
                    const newImages = images.filter((img) => img !== image);
                    form.setValue("images", newImages);
                  }}
                  className="rounded-md absolute top-1 right-1"
                >
                  <Trash />
                </Button>
              </div>
            ))}
          <ManageImageWrapper onSetImages={onSetImages}>
            <div className="aspect-square bg-background flex items-center justify-center border rounded-md">
              <Plus />
            </div>
          </ManageImageWrapper>
        </div>
      </CardContent>
    </Card>
  );
}

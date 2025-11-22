"use client";

import CustomFormField from "@/components/form/custom-form-field";
import CustomFormSubmitBtn from "@/components/form/custom-form-submit-btn";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { addProductSchema, AddProductShape, AddProductType } from "../schemas";
import { addProduct } from "../actions";
import { toast } from "sonner";
import AddImage from "./add-image";
import { useState } from "react";

export default function AddProductForm() {
  const [images, setImages] = useState<string[]>([]);
  const form = useForm<AddProductType>({
    resolver: zodResolver(addProductSchema),
    defaultValues: {
      name: "",
      description: "",
      price: "",
      images: [],
      quantity: "0",
    },
  });
  const isPending = form.formState.isSubmitting;
  const onSubmit = async (inputs: AddProductType) => {
    await addProduct({ ...inputs, images });
    form.reset();
    setImages([]);
    toast.success("New product is created");
  };
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <AddImage images={images} setImages={setImages} />
          <CustomFormField<AddProductShape>
            form={form}
            input="text"
            name="name"
            title="Product name"
          />
          <CustomFormField<AddProductShape>
            form={form}
            input="text"
            name="description"
            title="Descriptions"
          />
          <CustomFormField<AddProductShape>
            form={form}
            input="text"
            name="price"
            title="Price"
          />
          <CustomFormField<AddProductShape>
            form={form}
            input="number"
            name="quantity"
            title="Quantity"
          />
          <CustomFormSubmitBtn isPending={isPending}>
            Submit
          </CustomFormSubmitBtn>
        </form>
      </Form>
    </div>
  );
}

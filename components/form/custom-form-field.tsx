import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FieldPath, UseFormReturn } from "react-hook-form";
import z, { ZodObject, ZodRawShape } from "zod";

type CustomFormFieldType<T extends ZodRawShape> = {
  form: UseFormReturn<z.infer<ZodObject<T>>>;
  name: FieldPath<z.infer<ZodObject<T>>>;
  title: string;
  input: "text" | "email" | "number";
  required?: boolean;
};

export default function CustomFormField<T extends ZodRawShape>(
  props: CustomFormFieldType<T>
) {
  return (
    <FormField
      control={props.form.control}
      name={props.name}
      render={({ field }) => {
        const safeField = {
          ...field,

          value: field.value as string | undefined,
        };
        const { input, title, required } = props;
        return (
          <FormItem>
            <FormLabel>{required ? `${title} *` : title}</FormLabel>
            <FormControl>
              {input === "text" ? (
                <Input type="text" {...safeField} />
              ) : input === "email" ? (
                <Input type="email" {...safeField} />
              ) : input === "number" ? (
                <Input type="number" {...safeField} />
              ) : null}
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}

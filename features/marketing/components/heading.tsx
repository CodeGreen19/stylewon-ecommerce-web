import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export default function Heading({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "text-xl md:text-2xl mb-6 font-semibold text-center",
        className
      )}
    >
      {children}
    </div>
  );
}

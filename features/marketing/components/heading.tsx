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
        "text-xl md:text-2xl border-b border-cyan-600 border-dashed mb-6  font-semibold p-2 mt-4 text-center",
        className
      )}
    >
      {children}
    </div>
  );
}

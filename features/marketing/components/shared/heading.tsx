import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

export function NavigateHeading({
  children,
  className,
  link,
}: {
  children: ReactNode;
  className?: string;
  link: string;
}) {
  return (
    <Link href={link}>
      <div
        className={cn(
          "mb-6 flex items-center gap-2 py-2 text-lg font-semibold md:text-xl",
          className,
        )}
      >
        <ChevronLeft /> {children}
      </div>
    </Link>
  );
}

export function Heading({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mb-6 flex items-center gap-2 py-2 text-lg font-semibold md:text-xl",
        className,
      )}
    >
      {children}
    </div>
  );
}

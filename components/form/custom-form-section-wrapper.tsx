import React, { ReactNode } from "react";

export default function CustomFormSectionWrapper({
  children,
  heading,
}: {
  children: ReactNode;
  heading: string;
}) {
  return (
    <div className="shadow rounded-md p-4 pb-8">
      <h1 className="text-xl font-bold pb-6">{heading}</h1>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

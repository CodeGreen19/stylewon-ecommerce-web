import { FileCog } from "lucide-react";
import React from "react";

export default function ImageDetailsSection() {
  return (
    <div className="overflow-auto lg:flex gap-5 flex-col items-center mt-5">
      <FileCog className="size-20 opacity-50 " />
      <h3>No file is selected.</h3>
    </div>
  );
}

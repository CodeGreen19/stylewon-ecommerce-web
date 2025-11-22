"use client";

import { FileCog } from "lucide-react";
import React from "react";
import { useAddImage } from "./hooks/use-add-image";
import { Button } from "../ui/button";

export default function ImageDetailsSection() {
  const { images } = useAddImage();
  return (
    <div className="overflow-auto lg:flex gap-5 flex-col items-center mt-5">
      <FileCog className="size-20 opacity-50 " />
      {images.length === 0 ? (
        <h3>No file is selected.</h3>
      ) : (
        <div>
          <span>{images.length} file(s) is selected</span>
        </div>
      )}
    </div>
  );
}

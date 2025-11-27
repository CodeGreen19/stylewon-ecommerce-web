import React from "react";
import { Spinner } from "../ui/spinner";
import { AlertCircle } from "lucide-react";

export default function Loading() {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="p-12 rounded-xl border">
        <Spinner />
      </div>
    </div>
  );
}

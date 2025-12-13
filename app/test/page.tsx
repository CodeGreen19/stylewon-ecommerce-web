"use client";

import { upazilas } from "@/lib/constants";
import React from "react";

export default function page() {
  return (
    <div>
      {upazilas.map((u) => (
        <div key={u.id}>{u.name}</div>
      ))}
    </div>
  );
}

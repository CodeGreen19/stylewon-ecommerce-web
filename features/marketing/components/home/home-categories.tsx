import React from "react";
import { FileText, Image as ImageIcon, Video, Music } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const categories = [
  { label: "Text", icon: FileText },
  { label: "Images", icon: ImageIcon },
  { label: "Video", icon: Video },
  { label: "Audio", icon: Music },
];

export default function HomeCategories() {
  return (
    <div className="grid grid-cols-4 max-w-5xl m-auto gap-2 p-2 lg:p-0 lg:mt-5">
      {categories.map((cat) => {
        const Icon = cat.icon;
        return (
          <Card
            key={cat.label}
            className="rounded-md shadow-md hover:shadow-xl transition p-2 cursor-pointer bg-cyan-500 border-cyan-600 hover:scale-[1.02]"
          >
            <CardContent className="flex flex-col items-center justify-center gap-3">
              <Icon />
              <p className="text-lg font-medium">{cat.label}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

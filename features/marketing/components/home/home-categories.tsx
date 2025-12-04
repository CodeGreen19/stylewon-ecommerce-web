import { Card, CardContent } from "@/components/ui/card";
import { FileText, Image as ImageIcon, Music, Video } from "lucide-react";

const categories = [
  { label: "Text", icon: FileText },
  { label: "Images", icon: ImageIcon },
  { label: "Video", icon: Video },
  { label: "Audio", icon: Music },
];

export function HomeCategories() {
  return (
    <div className="m-auto grid max-w-5xl grid-cols-4 gap-2 p-2 lg:mt-5 lg:p-0">
      {categories.map((cat) => {
        const Icon = cat.icon;
        return (
          <Card
            key={cat.label}
            className="cursor-pointer rounded-md border-cyan-600 bg-cyan-500 p-2 shadow-md transition hover:scale-[1.02] hover:shadow-xl"
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

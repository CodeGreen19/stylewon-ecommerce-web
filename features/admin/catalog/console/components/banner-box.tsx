"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, UploadCloud } from "lucide-react";

const dummyBanners = [
  {
    id: "1",
    url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
  },
  {
    id: "2",
    url: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f",
  },
];

export function BannerBox() {
  return (
    <Card className="rounded-2xl">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Website Banners</CardTitle>
        <p className="text-muted-foreground text-sm">
          These banners will be shown on your homepage hero section
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Upload / Dropzone Area */}
        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed px-6 py-10 text-center">
          <UploadCloud className="text-muted-foreground h-6 w-6" />

          <div className="space-y-1">
            <p className="text-sm font-medium">Upload banner image</p>
            <p className="text-muted-foreground text-xs">
              Drag & drop or click to select (1 image only)
            </p>
          </div>

          <Button variant="outline" size="sm">
            Select Image
          </Button>
        </div>

        {/* Banner Preview List */}
        {dummyBanners.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {dummyBanners.map((banner) => (
              <div
                key={banner.id}
                className="group relative overflow-hidden rounded-xl border"
              >
                <img
                  src={banner.url}
                  alt="Banner"
                  className="h-40 w-full object-cover"
                />

                {/* Hover Actions */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                  <Button
                    size="icon"
                    variant="destructive"
                    className="rounded-full"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {dummyBanners.length === 0 && (
          <p className="text-muted-foreground text-center text-sm">
            No banners uploaded yet
          </p>
        )}
      </CardContent>
    </Card>
  );
}

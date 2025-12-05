"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { ChevronsUpDown, File } from "lucide-react";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { Progress } from "../ui/progress";
import ImageDetailsSection from "./image-detail-section";
import SiteFilesSection from "./site-files-section";
import TrashImage from "./trash-image";
import UploadButton from "./upload-button";
import { useAddImage } from "./hooks/use-add-image";
import { Button } from "../ui/button";

const tabs = ["Site Files", "Trash"] as const;

export function ManageImageWrapper({
  children,
  onSetImages,
}: {
  children: React.ReactNode;
  onSetImages: (images: string[]) => void;
}) {
  const isMobile = useIsMobile();
  const { images, clearImages } = useAddImage();
  const [activeTab, setActiveTab] =
    useState<(typeof tabs)[number]>("Site Files");

  const closeRef = useRef<HTMLButtonElement>(null);

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="flex h-[95vh] min-w-[98vw] flex-col p-0 lg:h-[85vh] lg:min-w-[85vw]">
        <DialogHeader className="relative p-4 pt-6 md:px-6">
          <DialogTitle className="text-start">
            <span>Asset Management</span>
            {images.length !== 0 && (
              <div className="absolute top-3 right-4 p-4 lg:right-8">
                <Button
                  onClick={() => {
                    onSetImages(images);
                    closeRef.current?.click();
                    clearImages();
                  }}
                  className="rounded-full"
                >
                  Add to page ({images.length})
                </Button>
              </div>
            )}
          </DialogTitle>
          <DialogDescription className="text-start">
            Upload, crop, structure your assets here.
          </DialogDescription>
        </DialogHeader>
        {isMobile && (
          <MobileNavigationBar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        )}
        <div className="h-[50vh] flex-1 rounded-md">
          <div className="grid h-full grid-cols-1 border lg:grid-cols-[200px_1fr_280px]">
            <section className="relative hidden border-r lg:block">
              <BigScreenSidebarSideBar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
            </section>
            <section className="relative overflow-y-auto border-r">
              {activeTab === "Site Files" ? (
                <SiteFilesSection />
              ) : activeTab === "Trash" ? (
                <TrashImage />
              ) : null}
            </section>
            <section className="hidden lg:block">
              <ImageDetailsSection />
            </section>
          </div>
        </div>
      </DialogContent>
      <DialogClose ref={closeRef} />
    </Dialog>
  );
}
function MobileNavigationBar({
  activeTab,
  setActiveTab,
}: {
  activeTab: (typeof tabs)[number];
  setActiveTab: Dispatch<SetStateAction<(typeof tabs)[number]>>;
}) {
  return (
    <div className="flex items-center justify-between px-4">
      <DropdownMenu>
        <DropdownMenuTrigger className="flex w-40 items-center justify-between rounded-full border p-4 py-1.5">
          <span>{activeTab}</span> <ChevronsUpDown className="size-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Manage</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {tabs.map((tab) => (
            <DropdownMenuItem onClick={() => setActiveTab(tab)} key={tab}>
              {tab}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <UploadButton />
    </div>
  );
}

function BigScreenSidebarSideBar({
  activeTab,
  setActiveTab,
}: {
  activeTab: (typeof tabs)[number];
  setActiveTab: Dispatch<SetStateAction<(typeof tabs)[number]>>;
}) {
  return (
    <div>
      <div className="bg-accent/50 flex h-20 items-center justify-center border-b px-4">
        <UploadButton className="w-full" />
      </div>
      <div>
        <h1 className="text-muted-foreground p-4 text-sm font-semibold">
          Manage
        </h1>
        {tabs.map((tab) => (
          <div
            onClick={() => setActiveTab(tab)}
            className={cn(
              "hover:bg-accent flex items-center gap-2.5 p-2 px-5",
              tab === activeTab && "bg-accent",
            )}
            key={tab}
          >
            <File className="size-4" />
            <span>{tab}</span>
          </div>
        ))}
      </div>
      <div className="absolute bottom-0 left-0 w-full space-y-2 border-t p-4 lg:p-6">
        <h4 className="text-[10px] lg:text-sm">1 MB used out of 20 GB</h4>
        <Progress />
      </div>
    </div>
  );
}

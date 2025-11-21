"use client";

import {
  Dialog,
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
import { Dispatch, SetStateAction, useState } from "react";
import { Progress } from "../ui/progress";
import ImageDetailsSection from "./image-detail-section";
import SiteFilesSection from "./site-files-section";
import TrashImage from "./trash-image";
import UploadButton from "./upload-button";

const tabs = ["Site Files", "Trash"] as const;

export function ManageImageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const isMobile = useIsMobile(1024);
  const [activeTab, setActiveTab] =
    useState<(typeof tabs)[number]>("Site Files");

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className=" min-w-[98vw] h-[95vh] lg:min-w-[85vw] lg:h-[85vh] p-0 flex flex-col">
        <DialogHeader className="p-4 md:px-6 pt-6">
          <DialogTitle className="text-start">Asset Management</DialogTitle>
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
        <div className="flex-1 h-[50vh] rounded-md">
          <div className="border grid grid-cols-1 lg:grid-cols-[200px_1fr_280px]  h-full">
            <section className="border-r hidden lg:block relative">
              <BigScreenSidebarSideBar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
            </section>
            <section className="border-r overflow-y-auto">
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
    <div className="flex items-center justify-between  px-4">
      <DropdownMenu>
        <DropdownMenuTrigger className="w-40 border flex items-center justify-between py-1.5 p-4 rounded-full">
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
      <div className="h-20 bg-accent/50 flex border-b px-4 items-center justify-center">
        <UploadButton className="w-full" />
      </div>
      <div>
        <h1 className="text-muted-foreground font-semibold text-sm p-4">
          Manage
        </h1>
        {tabs.map((tab) => (
          <div
            onClick={() => setActiveTab(tab)}
            className={cn(
              "p-2 px-5 hover:bg-accent gap-2.5 flex items-center",
              tab === activeTab && "bg-accent"
            )}
            key={tab}
          >
            <File className="size-4" />
            <span>{tab}</span>
          </div>
        ))}
      </div>
      <div className=" p-4 lg:p-6 border-t  absolute bottom-0 left-0 w-full space-y-2">
        <h4 className=" text-[10px] lg:text-sm ">1 MB used out of 20 GB</h4>
        <Progress />
      </div>
    </div>
  );
}

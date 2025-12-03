import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PenSquareIcon, Plus } from "lucide-react";
import { ReactNode } from "react";

type ProfileInfoSectionWrapperType = {
  label: string;
  value: string;
  buttonValue: {
    add: string;
    change: string;
  };
  buttonType: "ADD" | "CHANGE";
  children: ReactNode;
};
export function ProfileInfoSectionWrapper(info: ProfileInfoSectionWrapperType) {
  return (
    <Dialog>
      {info.buttonType === "ADD" ? (
        <div className="flex w-full flex-row items-center gap-4">
          <h1 className="text-sm font-semibold">{info.label} </h1>

          <DialogTrigger asChild>
            <Button variant={"outline"}>
              <Plus />
              <span className="hidden md:block">{info.buttonValue.add}</span>
            </Button>
          </DialogTrigger>
        </div>
      ) : info.buttonType === "CHANGE" ? (
        <div>
          <h1 className="text-sm font-semibold">{info.label} </h1>
          <div className="flex w-full flex-row items-center gap-2 md:gap-4">
            <Badge>{info.value}</Badge>
            <DialogTrigger asChild>
              <Button variant={"ghost"}>
                <PenSquareIcon />{" "}
                <span className="hidden md:block">
                  {info.buttonValue.change}
                </span>
              </Button>
            </DialogTrigger>
          </div>
        </div>
      ) : null}

      <DialogContent className="min-h-1/2">
        <DialogHeader>
          <DialogTitle className="text-start text-base">
            {info.buttonType === "ADD"
              ? info.buttonValue.add
              : info.buttonValue.change}
          </DialogTitle>
        </DialogHeader>
        <div className="pt-4">{info.children}</div>
      </DialogContent>
    </Dialog>
  );
}

import { ManageImageWrapper } from "@/components/assert-management/manage-image-wrapper";
import { Plus } from "lucide-react";

export default function AddImage() {
  return (
    <div className="min-h-40 border-2 border-dashed rounded-md p-6">
      <ManageImageWrapper>
        <div className="size-14 bg-background flex items-center justify-center border rounded-md">
          <Plus />
        </div>
      </ManageImageWrapper>
    </div>
  );
}

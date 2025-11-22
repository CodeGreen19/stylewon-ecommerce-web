import { ManageImageWrapper } from "@/components/assert-management/manage-image-wrapper";
import { Button } from "@/components/ui/button";
import { Plus, Trash } from "lucide-react";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

export default function AddImage({
  images,
  setImages,
}: {
  images: string[];
  setImages: Dispatch<SetStateAction<string[]>>;
}) {
  const onSetImages = (selectedImages: string[]) => {
    setImages((existed) => {
      const marged = [...existed, ...selectedImages];
      const unique = Array.from(new Set(marged));
      return unique;
    });
  };
  return (
    <div className="min-h-40 border-2 border-dashed rounded-md p-6 gap-1 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {images.length !== 0 &&
        images.map((image, i) => (
          <div
            key={i}
            className="border relative rounded-md aspect-square overflow-hidden"
          >
            <Image
              src={image}
              height={100}
              width={100}
              className="w-full object-contain"
              alt="product-img"
            />
            <Button
              type="button"
              onClick={() => {
                const newImages = images.filter((img) => img !== image);
                setImages(newImages);
              }}
              className="rounded-md absolute top-1 right-1"
            >
              <Trash />
            </Button>
          </div>
        ))}
      <ManageImageWrapper onSetImages={onSetImages}>
        <div className="aspect-square bg-background flex items-center justify-center border rounded-md">
          <Plus />
        </div>
      </ManageImageWrapper>
    </div>
  );
}

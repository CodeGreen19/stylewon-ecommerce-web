import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { getAsserts } from "./server/queries";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";
import { Crop, Trash } from "lucide-react";
import { deleteAssert } from "./server/actions";
import { LoadingSwap } from "../ui/loading-swap";
import { useAddImage } from "./hooks/use-add-image";
import { cn } from "@/lib/utils";

export default function SiteFilesSection() {
  const { isPending, data, error } = useQuery({
    queryFn: () => getAsserts(),
    queryKey: ["asserts"],
  });
  if (isPending) {
    return (
      <div className="flex gap-2 p-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-[100px] w-[100px]" />
        ))}
      </div>
    );
  }
  if (error) {
    return <div>Error</div>;
  }

  return (
    <div className="grid grid-cols-2 gap-1 lg:grid-cols-4 xl:grid-cols-6 overflow-y-auto">
      {data.map((item, i) => (
        <ImageCard key={i} publicId={item.publicId} url={item.secureUrl} />
      ))}
    </div>
  );
}

function ImageCard({ url, publicId }: { url: string; publicId: string }) {
  const { images, addImage, removeImage } = useAddImage();
  const qc = useQueryClient();
  const { isPending, mutate } = useMutation({
    mutationFn: deleteAssert,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["asserts"] });
    },
  });
  return (
    <div
      onClick={() => (images.includes(url) ? removeImage(url) : addImage(url))}
      className={cn(
        "flex-none p-1 border transition-all",
        images.includes(url) && "scale-95 ring-2 ring-black/50 "
      )}
    >
      <div className="border aspect-square ">
        <Image src={url} height={400} width={400} alt="site-image" />
      </div>
      <div className="flex gap-1 p-1">
        <Button
          disabled={isPending}
          onClick={() => mutate(publicId)}
          className="rounded-sm"
          size={"sm"}
        >
          <LoadingSwap isLoading={isPending}>
            <Trash />
          </LoadingSwap>
        </Button>
        <Button className="rounded-sm" size={"sm"}>
          <Crop />
        </Button>
      </div>
    </div>
  );
}

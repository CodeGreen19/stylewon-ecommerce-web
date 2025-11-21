"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { FileUp, Plus, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "../ui/button";
import ImageCropper from "./image-croper";
import Upload from "./upload";

export default function UploadButton({ className }: { className?: string }) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [cropped, setCropped] = useState<Blob | null>(null);
  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop: setSelectedFiles,
    noClick: true,
    noKeyboard: true,
  });

  return (
    <Dialog onOpenChange={() => setSelectedFiles([])}>
      <DialogTrigger asChild>
        <Button className={cn("rounded-full", className)}>
          Upload <Plus className="ml-2 h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-[96vw] lg:max-w-[40vw] h-[80vh]  flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-start">
            Upload Image{" "}
            {selectedFiles.length ? `(${selectedFiles.length})` : null}
          </DialogTitle>
        </DialogHeader>

        {selectedFiles.length === 0 ? (
          <div
            {...getRootProps()}
            className={cn(
              "flex-1 rounded-md border-2 border-dashed flex items-center justify-center transition-all",
              "bg-accent/40",
              isDragActive
                ? "border-primary bg-primary/10"
                : "border-muted-foreground/30"
            )}
          >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center gap-4 pointer-events-none">
              {isDragActive ? (
                <h6 className="font-medium text-primary">
                  Drop your files here…
                </h6>
              ) : (
                <>
                  <h6 className="font-medium">Drag & drop files here</h6>

                  <Button
                    onClick={open}
                    type="button"
                    className="rounded-full pointer-events-auto gap-0"
                  >
                    Upload from computer <FileUp className="ml-2 h-4 w-4" />
                  </Button>
                </>
              )}
            </div>
          </div>
        ) : (
          // <ShowSelectedImages files={selectedFiles} /> //todo
          <Upload files={selectedFiles} setFiles={setSelectedFiles} />
        )}
      </DialogContent>
    </Dialog>
  );
}

function ShowSelectedImages({ files }: { files: File[] }) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [existedFiles, setExistedFiles] = useState<File[]>(files);
  return (
    <div>
      <div className="flex gap-2 mb-4 overflow-x-auto">
        {existedFiles.map((file, i) => (
          <div
            onClick={() => setSelectedFile(file)}
            key={i}
            className="border relative overflow-hidden rounded-md aspect-square "
          >
            <Image
              src={URL.createObjectURL(file)}
              height={80}
              width={80}
              alt="selected"
            />
            <X className="size-4 bg-primary text-secondary rounded-full absolute top-1 right-1 " />
          </div>
        ))}
      </div>
      <ImageCropper
        file={selectedFile ?? existedFiles[0]}
        onDone={(blob) => {}}
      />
    </div>
  );
}

"use client";

import { PlusCircle, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { generateClientDropzoneAccept, generatePermittedFileTypes } from "uploadthing/client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useUploadThing } from "@/lib/uploadthing";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useDropzone } from "@uploadthing/react";

export default function UploadButton() {
  const [files, setFiles] = useState<File[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const router = useRouter();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  }, []);

  const { startUpload, routeConfig } = useUploadThing("audioUploader", {
    onClientUploadComplete: async () => {
      setIsDialogOpen(false);
      setIsUploading(false);
      router.push("/dashboard/meetings");
    },
    onUploadError: (err) => {
      setIsUploading(false);
      console.error(err.message);
      toast.error(err.message);
    },
    onUploadBegin: () => {
      setIsUploading(true);
      toast.info("👾 Uploading file");
    },
  });

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: generateClientDropzoneAccept(generatePermittedFileTypes(routeConfig).fileTypes),
  });

  const handleDialogOpenChange = () => {
    setFiles([]);
    setIsDialogOpen((prev) => !prev);
  };

  const isFileReady = files.length > 0;

  return (
    <Dialog
      onOpenChange={handleDialogOpenChange}
      open={isDialogOpen}>
      <DialogTrigger asChild>
        <Button className="w-full py-5 hover:cursor-pointer">
          <PlusCircle />
          <span>Upload meeting</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="h-[320px]">
        <VisuallyHidden>
          <DialogTitle>Upload file</DialogTitle>
          <DialogDescription>Choose a file or drag and drop</DialogDescription>
        </VisuallyHidden>
        <div
          {...getRootProps()}
          className="flex flex-col items-center justify-center gap-4">
          <input
            {...getInputProps()}
            disabled={isFileReady}
          />
          <Upload className="size-12" />
          <div className="flex flex-col items-center">
            <span className="text-base font-medium">{isFileReady ? files[0].name : "Choose a file or drag and drop"}</span>
            <span className="text-muted-foreground">Audio (128MB)</span>
          </div>
          <Button
            onClick={() => startUpload(files)}
            disabled={isUploading || !isFileReady}
            variant={isFileReady ? "default" : "secondary"}
            className="w-[150px] hover:cursor-pointer">
            {isUploading ? "Uploading..." : isFileReady ? "Upload file" : "Select file"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

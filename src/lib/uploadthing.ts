import { OurFileRouter } from "@/app/api/uploadthing/core";
import { generateReactHelpers, generateUploadDropzone } from "@uploadthing/react";

export const { useUploadThing } = generateReactHelpers<OurFileRouter>();
export const UploadDropzone = generateUploadDropzone<OurFileRouter>();

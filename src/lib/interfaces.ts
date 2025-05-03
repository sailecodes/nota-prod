import { ProcessStatus } from "@/app/generated/prisma";

export interface INavbarClientProps {
  isAuthenticated: boolean;
}

export interface IMeetingCardSkeletonProps {
  title: string;
  processStatus: ProcessStatus;
  uploader: string;
  createdAt: Date;
  className?: string;
}

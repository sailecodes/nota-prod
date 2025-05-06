import { LucideIcon } from "lucide-react";
import { ProcessStatus } from "@/app/generated/prisma";

export interface INavbarClientProps {
  isAuthenticated: boolean;
}

export interface IFeatureCardProps {
  number: string;
  title: string;
  description: string;
}

export interface IPricingCardProps {
  title: string;
  description: string;
  pricing: string;
  btnText: string;
  features: string[];
}

export interface ICustomSidebarGroupProps {
  isPrimaryBtn: boolean;
  BtnIcon?: LucideIcon;
  btnText?: string;
  hasGroupLabel: boolean;
  labelText?: string;
  groupItems?: { href: string; Icon: LucideIcon; heading: string }[];
  className?: string;
}

export interface IMeetingCardSkeletonProps {
  title: string;
  processStatus: ProcessStatus;
  uploader: string;
  createdAt: Date;
  className?: string;
}

export interface IMeetingCardProps {
  title: string;
  processStatus: ProcessStatus;
  uploader: string | null;
  createdAt: Date;
  summary?: string;
  actionItemsNum?: number;
  meetingId: string;
}

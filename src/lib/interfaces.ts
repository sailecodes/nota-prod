import { LucideIcon } from "lucide-react";
import { DueStatus, ProcessStatus, User } from "@/app/generated/prisma";

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
  uploader: User;
  createdAt: Date;
  summary?: string;
  numActionItems?: number;
  meetingId: string;
}

export interface ActionItemSnippetProps {
  id: string;
  action: string;
  dueDate: Date | null;
  assignee: User | null;
  dueStatus: DueStatus;
}

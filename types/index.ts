import { IconNode } from "lucide-react";

export interface ICreateUserDataType {
  clerkId: string;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
}

export interface IUpdateuserDataType {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
}

export interface INavMenu {
  name: string;
  link: string;
  icon?: IconNode;
}

export interface IFeatureCard {
  title: string;
  subTitle: string;
  desc: string;
}

export interface IPricingCard {
  name: string;
  amount?: number;
  credit?: number;
  custom?: boolean;
  benifits?: string[];
}

import { ReactNode } from "react";

export interface FeatureCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  delay?: number;
}

export interface NavItemProps {
  label: string;
  href: string;
  active?: boolean;
}

export interface GlitchButtonProps {
  text: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  className?: string;
  type?: "button" | "submit" | "reset";
}

export interface TickerItem {
  symbol: string;
  name: string;
  price: string;
  change: string;
  isPositive: boolean;
}

export type PlanType = 'simple' | 'compound' | 'income';
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface GlassPanelProps {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
  noise?: boolean;
  style?: React.CSSProperties;
  onClick?: () => void;
  tabIndex?: number;
  role?: string;
  "aria-labelledby"?: string;
}

export function GlassPanel({ children, className, interactive = false, noise = true, style, onClick, ...props }: GlassPanelProps) {
  return (
    <div 
      className={cn(
        "glass-panel",
        interactive && "glass-card",
        noise && "noise-texture",
        onClick && "cursor-pointer",
        className
      )}
      style={style}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
}
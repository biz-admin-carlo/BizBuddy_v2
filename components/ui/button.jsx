// biz-web-app/components/ui/button.jsx

"use client";

import React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-black text-white ",
        ghost: "bg-transparent ",
      },
      size: {
        default: "h-10 px-4 py-2",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      brand: "bg-blue-500 text-white hover:bg-blue-600",
    },
  }
);

export const Button = React.forwardRef((props, ref) => {
  const { className, variant = "default", size = "default", ...rest } = props;

  return (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size, className }))}
      {...rest}
    />
  );
});

Button.displayName = "Button";

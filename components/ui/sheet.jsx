// biz-web-app/components/ui/sheet.jsx

"use client";
import * as React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const Sheet = SheetPrimitive.Root;
const SheetTrigger = SheetPrimitive.Trigger;
const SheetClose = SheetPrimitive.Close;

const SheetContent = React.forwardRef(
  ({ side = "right", className, children, ...props }, ref) => {
    return (
      <SheetPrimitive.Portal>
        <SheetPrimitive.Overlay className="fixed inset-0 bg-black/50" />
        <SheetPrimitive.Content
          ref={ref}
          className={cn(
            "fixed top-0 right-0 h-full bg-white dark:bg-gray-800 p-4 shadow-lg",
            className
          )}
          {...props}
        >
          <SheetClose className="absolute top-2 right-2">
            <X className="w-4 h-4" />
          </SheetClose>
          {children}
        </SheetPrimitive.Content>
      </SheetPrimitive.Portal>
    );
  }
);
SheetContent.displayName = "SheetContent";

const SheetHeader = ({ className, ...props }) => (
  <div className={cn("mb-4", className)} {...props} />
);
SheetHeader.displayName = "SheetHeader";

const SheetTitle = React.forwardRef(({ className, ...props }, ref) => (
  <SheetPrimitive.Title
    ref={ref}
    className={cn("text-lg font-bold", className)}
    {...props}
  />
));
SheetTitle.displayName = "SheetTitle";

export {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
};

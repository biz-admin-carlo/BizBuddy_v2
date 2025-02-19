// biz-web-app/components/ui/textarea.jsx

import * as React from "react";
import { cn } from "@/lib/utils";

const Textarea = React.forwardRef(function Textarea(
  { className, ...props },
  ref
) {
  return (
    <textarea
      className={cn(
        // Base styles
        "w-full min-h-[60px] px-3 py-2 text-base bg-transparent placeholder:text-muted-foreground shadow-sm disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",

        // Your requested classes
        "border rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200",

        // Merge any additional classes passed in
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

Textarea.displayName = "Textarea";

export { Textarea };

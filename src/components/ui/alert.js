import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "./utils";

const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm shadow-sm transition-all duration-300 ease-in-out",
  {
    variants: {
      variant: {
        default: "bg-white text-gray-800 border-gray-300",
        destructive:
          "bg-red-50 text-red-800 border-red-300 dark:bg-red-900 dark:text-red-100",
        success:
          "bg-green-50 text-green-800 border-green-300 dark:bg-green-900 dark:text-green-100",
        warning:
          "bg-yellow-50 text-yellow-800 border-yellow-300 dark:bg-yellow-900 dark:text-yellow-100",
        info: "bg-blue-50 text-blue-800 border-blue-300 dark:bg-blue-900 dark:text-blue-100",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const Alert = React.forwardRef(({ className, variant, children, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(
      alertVariants({ variant }),
      "flex items-start gap-4 p-4",
      className
    )}
    {...props}
  >
    {variant === "destructive" && <span className="text-red-600">&#x26A0;</span>}
    {variant === "success" && <span className="text-green-600">&#x2714;</span>}
    {variant === "warning" && <span className="text-yellow-600">&#x26A1;</span>}
    {variant === "info" && <span className="text-blue-600">&#x2139;</span>}
    <div>{children}</div>
  </div>
));
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn(
      "mb-1 font-semibold text-lg leading-tight tracking-tight",
      className
    )}
    {...props}
  />
));
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm leading-relaxed", className)}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };

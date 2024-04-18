import cn from "@/lib/utils/cn";
import { forwardRef } from "react";

interface Props {
  className?: string;
  variant?: string;
}

const Loader = forwardRef(({ className, variant }: Props, ref?: any) => {
  return (
    <div
      ref={ref}
      className={cn(
        `h-4 w-4 border-2 m-1 ${
          variant === "primary" ? "border-primary-600" : "border-white"
        } border-t-transparent rounded-full animate-spin`,
        className
      )}
    />
  );
});

Loader.displayName = "Loader";

export default Loader;

import cn from "@/lib/utils/cn";
import { forwardRef } from "react";

const Input = forwardRef(
  (
    { className, ...props }: React.InputHTMLAttributes<HTMLInputElement>,
    ref: any
  ) => {
    return (
      <div className={cn("block m-1", className)}>
        <input
          className={`px-3 py-2 rounded h-10 w-full border-none focus:outline-none focus:ring-2 focus:ring-primary-900 transition-all bg-gray-100`}
          {...props}
          ref={ref}
        />
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;

import cn from "@/lib/utils/cn";
import { forwardRef } from "react";
import Loader from "./loader";

interface CustomButtonProps {
  variant?: string;
  loading?: boolean;
}

interface ButtonProps
  extends CustomButtonProps,
    React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = forwardRef(
  (
    { variant = "primary", loading = false, children, ...props }: ButtonProps,
    ref: any
  ) => {
    const { className, ...buttonProps } = props;

    return (
      <button
        ref={ref}
        className={cn(
          "transition-all flex justify-center m-1 px-3 py-[6px] hover:opacity-80 rounded border-2 border-primary-900",
          `${
            variant === "secondary"
              ? "bg-transparent text-primary-900"
              : "bg-primary-900 text-white"
          }`,
          className
        )}
        {...buttonProps}
      >
        {children}
        <Loader
          className={`ml-2 ${!loading && "hidden"}`}
          variant={variant === "primary" ? "secondary" : "primary"}
        />
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;

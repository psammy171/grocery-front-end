import cn from "@/lib/utils/cn";
import { forwardRef } from "react";

interface Props {
  inputLabel: string;
  className?: string;
}

const Label = forwardRef(({ inputLabel, className }: Props, ref: any) => {
  return (
    <label className={cn("block text-sm m-1", className)}>{inputLabel}</label>
  );
});

Label.displayName = "Label";

export default Label;

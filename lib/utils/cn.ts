import cx from "classnames";
import { twMerge } from "tailwind-merge";

const cn = (...inputs: cx.ArgumentArray) => {
  return twMerge(cx(inputs));
};

export default cn;

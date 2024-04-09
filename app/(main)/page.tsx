"use client";

import StoreIcon from "@/components/icons/store";
import toast from "react-hot-toast";

export default function Home() {
  return (
    <main>
      <p className="font-thin">Grocery Store</p>
      <p className="font-normal">Grocery Store</p>
      <p className="font-semibold">Grocery Store</p>
      <p className="font-bold">Grocery Store</p>
      <StoreIcon className="w-5 h-5 text-primary-900" />
      <p
        onClick={() => {
          toast.success("New toast");
        }}
      >
        Show toast
      </p>
      <p
        onClick={() => {
          toast.error("New toast");
        }}
      >
        Show error toast
      </p>
    </main>
  );
}

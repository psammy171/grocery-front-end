"use client";

import { useState } from "react";
import GroceryList from "./grocery-list";
import PopUp from "@/components/ui/pop-up";
import useAxios from "@/lib/api/use-axios";
import GroceryForm from "./grocery-form";
import AddIcon from "@/components/icons/add";

const Grocery = () => {
  const axios = useAxios();
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="max-w-[1000px] mx-auto mt-10">
      <div className="flex items-center">
        <p className="text-2xl font-semibold mb-1">Grocery Items</p>
        <span className="flex-grow"></span>
        <span
          className=" py-1 px-2 rounded flex items-center gap-1 border-2 border-primary-900 text-primary-900 cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={() => setOpen(true)}
        >
          <AddIcon className="w-[14px] h-[14px]" />
          <p>Add Item</p>
        </span>
      </div>
      <GroceryList />
      <PopUp open={open} close={() => setOpen(false)}>
        <>
          <p className="text-xl font-semibold text-center py-2 border-b">
            Add Item
          </p>
          <GroceryForm axios={axios} close={() => setOpen(false)} />
        </>
      </PopUp>
    </div>
  );
};

export default Grocery;

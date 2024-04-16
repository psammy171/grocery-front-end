"use client";

import { useState } from "react";
import GroceryList from "./grocery-list";

const Grocery = () => {
  const [name, setName] = useState<string>("Garnier");

  return (
    <div className="max-w-[1000px] mx-auto mt-10">
      <p className="text-2xl font-semibold mb-1">Grocery Items</p>
      <GroceryList />
    </div>
  );
};

export default Grocery;

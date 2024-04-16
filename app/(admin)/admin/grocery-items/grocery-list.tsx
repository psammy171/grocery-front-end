"use client";

import { useAppDispatch, useAppSelector } from "@/store";
import GroceryItem from "./grocery-item";
import useAxios from "@/lib/api/use-axios";
import { useEffect } from "react";
import { intializeCart } from "@/store/items/item-actions";

const GroceryList = () => {
  const axios = useAxios();
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.items.loading);
  const items = useAppSelector((state) => state.items.items);

  useEffect(() => {
    dispatch(intializeCart(axios));
  }, [axios, dispatch]);

  return (
    <div className="mt-3">
      {loading && <p>Loading...</p>}
      {!loading && items.length === 0 && <p>No items created yet</p>}
      {!loading && items.length > 0 && (
        <div className="flex flex-wrap gap-4">
          {items.map((item) => (
            <GroceryItem key={item.id} item={item} axios={axios} />
          ))}
        </div>
      )}
    </div>
  );
};

export default GroceryList;

"use client";

import { useAppDispatch, useAppSelector } from "@/store";
import GroceryItem from "./grocery-item";
import useAxios from "@/lib/api/use-axios";
import { FormEvent, useEffect, useState } from "react";
import { initializeItems } from "@/store/items/item-actions";
import SearchIcon from "@/components/icons/search";

const GroceryList = () => {
  const axios = useAxios();
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState<string>("");
  const loading = useAppSelector((state) => state.items.loading);
  const items = useAppSelector((state) => state.items.items);

  useEffect(() => {
    dispatch(initializeItems(axios, true));
  }, [axios, dispatch]);

  return (
    <div className="mt-3">
      {loading && <p>Loading...</p>}
      {!loading && items.length === 0 && <p>No items created yet</p>}
      {!loading && items.length > 0 && (
        <div>
          <div className="relative mb-4">
            <input
              className="mx-auto peer bg-gray-100 border-none transition-all rounded focus:w-72  focus:ring-2 focus:ring-primary-900 py-2 w-40 pl-8"
              placeholder="Search"
              onChange={(e: any) => setSearch(e.target.value)}
            />
            <SearchIcon className="w-5 h-5 absolute mx-[6px] top-[10px] text-gray-500 peer-focus:text-gray-800 transition-colors duration-300" />
          </div>
          <div className="flex flex-wrap gap-4 mb-4">
            {items
              .filter((item) =>
                item.name
                  .replaceAll(" ", "")
                  .toLowerCase()
                  .includes(search.replaceAll(" ", "").toLowerCase())
              )
              .map((item) => (
                <GroceryItem key={item.id} item={item} axios={axios} />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GroceryList;

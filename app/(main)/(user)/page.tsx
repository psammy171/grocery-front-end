"use client";

import useAxios from "@/lib/api/use-axios";
import { useAppDispatch } from "@/store";
import { intializeCart } from "@/store/items/item-actions";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

export default function Home() {
  const axios = useAxios();
  const dispatch = useAppDispatch();
  const items = useSelector((state: any) => state.items.items);

  useEffect(() => {
    dispatch(intializeCart(axios));
  }, [axios, dispatch]);

  useEffect(() => {
    console.log("Items", items);
  }, [items]);

  return (
    <main>
      <p>Home page under construction</p>
    </main>
  );
}

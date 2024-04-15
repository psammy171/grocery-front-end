"use client";

import useAxios from "@/lib/api/use-axios";
import { useAppDispatch } from "@/store";
import { intializeCart } from "@/store/items/item-actions";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import ItemList from "./item-list";
import { initCart } from "@/store/cart/cart-actions";

export default function Home() {
  const axios = useAxios();
  const dispatch = useAppDispatch();
  const items = useSelector((state: any) => state.items.items);

  useEffect(() => {
    dispatch(intializeCart(axios));
    dispatch(initCart(axios));
  }, [axios, dispatch]);

  useEffect(() => {
    console.log("Items", items);
  }, [items]);

  return (
    <main>
      <p>Home page under construction</p>
      <ItemList />
    </main>
  );
}

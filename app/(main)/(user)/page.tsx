"use client";

import useAxios from "@/lib/api/use-axios";
import { useAppDispatch, useAppSelector } from "@/store";
import { intializeCart } from "@/store/items/item-actions";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import ItemList from "./item-list";
import { initCart } from "@/store/cart/cart-actions";

export default function Home() {
  const axios = useAxios();
  const dispatch = useAppDispatch();
  const items = useSelector((state: any) => state.items.items);
  const cartLoaded = useAppSelector((state) => state.cart.loaded);

  useEffect(() => {
    dispatch(intializeCart(axios));
  }, [axios, dispatch]);

  useEffect(() => {
    if (!cartLoaded) dispatch(initCart(axios));
  }, [axios, cartLoaded, dispatch]);

  return (
    <main>
      <p>Home page under construction</p>
      <ItemList />
    </main>
  );
}

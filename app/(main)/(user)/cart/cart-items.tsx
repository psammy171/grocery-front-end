"use client";

import Button from "@/components/ui/button";
import useAxios from "@/lib/api/use-axios";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  addItemToCart,
  initCart,
  removeItemFromCart,
} from "@/store/cart/cart-actions";
import { Item } from "@/types/Item";
import { useEffect, useState } from "react";
import AddressModal from "./address-modal";

const CartItems = () => {
  const axios = useAxios();
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState<boolean>(false);
  const cart = useAppSelector((state) => state.cart);

  useEffect(() => {
    if (!cart.loaded) dispatch(initCart(axios));
  }, [axios, cart, dispatch]);

  const addToCart = (item: Item) => {
    dispatch(addItemToCart(item, axios));
  };

  const removeFromCart = (item: Item) => {
    dispatch(removeItemFromCart(item, axios));
  };

  return (
    <div>
      <div className="max-w-md border rounded shadow-md mx-auto mt-[10%]">
        <p className="border-b p-4 text-xl font-semibold">Your cart</p>
        <div className="p-4">
          <p className="text-lg">Items</p>
          {cart.items.length === 0 && <p>No items added in the cart</p>}
          {cart.items.length > 0 && (
            <div className="w-full bg-gray-100 rounded">
              {cart.items.map((item, idx) => (
                <div
                  className={`flex p-3 ${idx !== 0 && "border-t"}`}
                  key={item.groceryItemId}
                >
                  <div className="flex-grow">
                    <p className="text-[18px] font-semibold">
                      {item.item.name}
                    </p>
                    <p>
                      {"\u20b9"} {item.item.price}
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <span className="border flex gap-1 bg-white rounded">
                      <span
                        className="w-5 h-5 text-center cursor-pointer"
                        onClick={() => removeFromCart(item.item)}
                      >
                        -
                      </span>
                      <span className="w-5 text-center">{item.quantity}</span>
                      <span
                        className="w-5 h-5 text-center cursor-pointer"
                        onClick={() => addToCart(item.item)}
                      >
                        +
                      </span>
                    </span>
                    <p className="text-right mr-1">
                      {"\u20b9"} {item.quantity * item.item.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <p className="text-right mx-4">{`Toatal : \u20B9 ${cart.total}`}</p>
        <div className="mx-4 mb-4 flex justify-end">
          <Button
            disabled={cart.items.length === 0}
            onClick={() => setOpen(true)}
          >
            Proceed
          </Button>
        </div>
      </div>
      <AddressModal open={open} close={() => setOpen(false)} />
    </div>
  );
};

export default CartItems;

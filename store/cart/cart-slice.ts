import { Item } from "@/types/Item";
import { CartItem } from "@/types/cart-item";
import { createSlice } from "@reduxjs/toolkit";
import { stat } from "fs";

type SliceType = {
  total: number;
  cartId: string;
  items: CartItem[];
};

const initialState: SliceType = {
  total: 0,
  cartId: "",
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const item = action.payload as Item;
      const existingItem = state.items.find(
        (cartItem) => item.id === cartItem.item.id
      );
      if (!existingItem) {
        state.total = item.price;
        state.items = [
          ...state.items,
          {
            quantity: 1,
            groceryItemId: item.id,
            orderId: state.cartId,
            item: item,
          },
        ];
      } else {
        existingItem.quantity++;
        state.total += item.price;
      }
    },
    removeItem: (state, action) => {
      const item = action.payload as Item;
      const existingItem = state.items.find(
        (cartItem) => item.id === cartItem.item.id
      );
      if (!existingItem) return;
      if (existingItem.quantity === 1) {
        state.total -= item.price;
        state.items.filter((cartItem) => cartItem.groceryItemId !== item.id);
      } else {
        existingItem.quantity -= 1;
        state.total -= item.price;
      }
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;

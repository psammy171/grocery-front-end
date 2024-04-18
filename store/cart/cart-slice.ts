import { Item } from "@/types/Item";
import { CartItem } from "@/types/cart-item";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SliceType = {
  total: number;
  cartId: string;
  loaded: boolean;
  items: CartItem[];
};

const initialState: SliceType = {
  total: 0,
  cartId: "",
  loaded: false,
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    init: (
      state,
      action: PayloadAction<{
        total: number;
        items: CartItem[];
        cartId?: string;
      }>
    ) => {
      const { payload } = action;
      state.cartId = payload.cartId || "";
      state.total = payload.total;
      state.items = payload.items;
      state.loaded = true;
    },
    addItem: (state, action: PayloadAction<{ item: Item; cartId: string }>) => {
      const item = action.payload.item;
      state.cartId = action.payload.cartId;
      const existingItem = state.items.find(
        (cartItem) => item.id === cartItem.item.id
      );
      if (!existingItem) {
        state.total += item.price;
        state.items = [
          ...state.items,
          {
            quantity: 1,
            groceryItemId: item.id,
            orderId: action.payload.cartId,
            item: item,
          },
        ];
      } else {
        existingItem.quantity++;
        state.total += item.price;
      }
    },
    removeItem: (state, action: PayloadAction<{ item: Item }>) => {
      const item = action.payload.item;
      const existingItem = state.items.find(
        (cartItem) => item.id === cartItem.item.id
      );
      if (!existingItem) return;
      if (existingItem.quantity === 1) {
        state.total -= item.price;
        state.items = state.items.filter(
          (cartItem) => cartItem.groceryItemId !== item.id
        );
      } else {
        existingItem.quantity -= 1;
        state.total -= item.price;
      }
    },
    checkOut: (state) => {
      const orderId = state.cartId;
      state.cartId = "";
      state.items = [];
      state.total = 0;
      window.location.assign(`/profile/my-orders/`);
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;

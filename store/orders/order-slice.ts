import { Address } from "@/types/address";
import { CartItem } from "@/types/cart-item";
import { User } from "@/types/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Order = {
  id: string;
  total: number;
  date?: string;
  items: CartItem[];
  user?: User;
  address: Address | null;
};

export type OrderByDate = {
  date: string;
  orders: Order[];
};

type SliceType = {
  loading: boolean;
  orders: OrderByDate[];
};

const initialState: SliceType = {
  loading: true,
  orders: [],
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    init: (state, action: PayloadAction<{ orders: OrderByDate[] }>) => {
      state.orders = action.payload.orders;
      state.loading = false;
    },
  },
});

export const orderActions = orderSlice.actions;

export default orderSlice;

import { Address } from "@/types/address";
import { CartItem } from "@/types/cart-item";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Order = {
  id: string;
  total: number;
  date?: string;
  items: CartItem[];
  address: Address | null;
};

export type OrderByDate = {
  date: string;
  orders: Order[];
};

type SliceType = {
  loading: boolean;
  ordres: Order[];
  ordersByUser: OrderByDate[];
};

const initialState: SliceType = {
  loading: true,
  ordres: [],
  ordersByUser: [],
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    init: (state, action: PayloadAction<{ orders: Order[] }>) => {
      state.ordres = action.payload.orders;
      state.loading = false;
    },
    initOrdersByUser: (
      state,
      action: PayloadAction<{ ordersByDate: OrderByDate[] }>
    ) => {
      state.ordersByUser = action.payload.ordersByDate;
      state.loading = false;
    },
  },
});

export const orderActions = orderSlice.actions;

export default orderSlice;

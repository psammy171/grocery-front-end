import { Address } from "@/types/address";
import { CartItem } from "@/types/cart-item";
import { User } from "@/types/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Order = {
  id: string;
  total: number;
  items: CartItem[];
  address: Address | null;
};

export type OrderByUser = {
  user: User;
  orders: [];
};

type SliceType = {
  loading: boolean;
  ordres: Order[];
  ordersByUser: OrderByUser[];
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
      action: PayloadAction<{ ordersByUser: OrderByUser[] }>
    ) => {
      state.ordersByUser = action.payload.ordersByUser;
      state.loading = false;
    },
  },
});

export const orderActions = orderSlice.actions;

export default orderSlice;

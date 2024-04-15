import { Address } from "@/types/address";
import { CartItem } from "@/types/cart-item";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Order = {
  id: string;
  total: number;
  items: CartItem[];
  address: Address | null;
};

type SliceType = {
  loading: boolean;
  ordres: Order[];
};

const initialState: SliceType = {
  loading: true,
  ordres: [],
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    init: (state, action: PayloadAction<{ orders: Order[] }>) => {
      state.ordres = action.payload.orders;
      state.loading = false;
    },
  },
});

export const orderActions = orderSlice.actions;

export default orderSlice;

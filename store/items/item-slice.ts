import { Item } from "@/types/Item";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ListItem = {
  item: Item;
  cartQuantity: number;
};

type SliceType = {
  loading: boolean;
  items: ListItem[];
};

const initialState: SliceType = {
  loading: true,
  items: [],
};

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    init: (state, action: PayloadAction<ListItem[]>) => {
      state.loading = false;
      state.items = action.payload;
    },
  },
});

export const itemActions = itemsSlice.actions;

export default itemsSlice;

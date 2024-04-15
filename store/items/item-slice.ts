import { Item } from "@/types/Item";
import { createSlice } from "@reduxjs/toolkit";

export type ListItem = {
  item: Item;
  cartQuantity: number;
};

type SliceType = {
  items: ListItem[];
};

const initialState: SliceType = {
  items: [],
};

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    init: (state, action) => {
      state.items = action.payload as ListItem[];
    },
  },
});

export const itemActions = itemsSlice.actions;

export default itemsSlice;

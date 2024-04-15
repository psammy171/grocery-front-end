import { Item } from "@/types/Item";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SliceType = {
  loading: boolean;
  items: Item[];
};

const initialState: SliceType = {
  loading: true,
  items: [],
};

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    init: (state, action: PayloadAction<Item[]>) => {
      state.loading = false;
      state.items = action.payload;
    },
  },
});

export const itemActions = itemsSlice.actions;

export default itemsSlice;

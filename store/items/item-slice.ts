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
    updateItem: (state, action: PayloadAction<Item>) => {
      state.items = state.items.map((item) => {
        if (item.id === action.payload.id) return action.payload;
        return item;
      });
    },
  },
});

export const itemActions = itemsSlice.actions;

export default itemsSlice;

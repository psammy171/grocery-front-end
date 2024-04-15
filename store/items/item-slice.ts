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
    addItemToCart: (state, action: PayloadAction<{ id: string }>) => {
      const existingItem = state.items.find(
        ({ item }) => item.id === action.payload.id
      );
      if (!existingItem) return;
      existingItem.cartQuantity += 1;
    },
    removeItemFromCart: (state, action: PayloadAction<{ id: string }>) => {
      const existingItem = state.items.find(
        ({ item }) => item.id === action.payload.id
      );
      if (!existingItem || existingItem.cartQuantity === 0) return;
      existingItem.cartQuantity -= 1;
    },
  },
});

export const itemActions = itemsSlice.actions;

export default itemsSlice;

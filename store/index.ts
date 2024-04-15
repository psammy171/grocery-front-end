import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cart/cart-slice";
import itemsSlice from "./items/item-slice";

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    items: itemsSlice.reducer,
  },
});

export default store;

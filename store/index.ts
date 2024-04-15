import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cart/cart-slice";
import itemsSlice from "./items/item-slice";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    items: itemsSlice.reducer,
  },
});

export default store;

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;

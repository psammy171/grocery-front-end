import { Item } from "@/types/Item";
import { Axios } from "axios";
import toast from "react-hot-toast";
import { cartActions } from "./cart-slice";

export const addItemToCart = (item: Item, axios: Axios) => {
  return async (dispatch: any) => {
    try {
      await axios.post("/cart/add-item", {
        itemId: item.id,
      });
      dispatch(cartActions.addItem({ item }));
    } catch (err) {
      toast.error("Failed to add item to cart!");
    }
  };
};

export const removeItemFromCart = (item: Item, axios: Axios) => {
  return async (dispatch: any) => {
    try {
      await axios.delete("/cart/remove-item", {
        data: {
          itemId: item.id,
        },
      });
      dispatch(cartActions.removeItem({ item }));
    } catch (err) {
      toast.error("Failed to add item to cart!");
    }
  };
};

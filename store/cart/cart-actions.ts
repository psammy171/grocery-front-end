import { Item } from "@/types/Item";
import { Axios } from "axios";
import toast from "react-hot-toast";
import { cartActions } from "./cart-slice";
import { CartItem } from "@/types/cart-item";

export const initCart = (axios: Axios) => {
  return async (dispatch: any) => {
    try {
      const res = await axios.get("/cart/items");
      const data = res.data;
      dispatch(
        cartActions.init({
          total: data.total,
          items: data.items,
          cartId: data.cartId,
        })
      );
    } catch (err) {
      toast.error("Something went wrong");
    }
  };
};

export const addItemToCart = (item: Item, axios: Axios) => {
  return async (dispatch: any) => {
    try {
      const res = await axios.post("/cart/add-item", {
        itemId: item.id,
      });
      const data = res.data;
      dispatch(cartActions.addItem({ item, cartId: data.cartId }));
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

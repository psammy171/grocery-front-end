import useAxios from "@/lib/api/use-axios";
import { Item } from "@/types/Item";
import { Axios } from "axios";
import toast from "react-hot-toast";

export const addItemToCart = (item: Item, axios: Axios) => {
  return async (dispatch: any) => {
    try {
      const res = await axios.post("/cart/add-item", {
        itemId: item.id,
      });
      dispatch({
        payload: item,
      });
    } catch (err) {
      toast.error("Failed to add item to cart!");
    }
  };
};

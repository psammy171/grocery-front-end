import toast from "react-hot-toast";
import { itemActions } from "./item-slice";
import { Axios } from "axios";
import { Item } from "@/types/Item";

export const initializeItems = (axios: Axios, isAdmin?: boolean) => {
  return async (dispatch: any) => {
    try {
      const res = await axios.get(`/grocery${isAdmin ? "/all" : ""}`);
      const data: Item[] = res.data;
      dispatch(itemActions.init(data));
    } catch (err) {
      toast.error("Failed to fetch items");
    }
  };
};

export const updateItem = (axios: Axios, item: Item) => {
  return async (dispatch: any) => {
    try {
      const res = await axios.patch(`/grocery/${item.id}`, item);
      dispatch(itemActions.updateItem(item));
      toast.success("Item updated");
    } catch (err) {
      toast.error("Something went wrong!");
    }
  };
};

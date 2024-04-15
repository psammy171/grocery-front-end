import toast from "react-hot-toast";
import { itemActions } from "./item-slice";
import { Axios } from "axios";
import { Item } from "@/types/Item";

export const intializeCart = (axios: Axios) => {
  return async (dispatch: any) => {
    try {
      const res = await axios.get("/grocery");
      const data: Item[] = res.data;
      dispatch(itemActions.init(data));
    } catch (err) {
      toast.error("Failed to fetch items");
    }
  };
};

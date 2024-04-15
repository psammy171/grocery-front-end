import { Axios } from "axios";
import toast from "react-hot-toast";
import { orderActions } from "./order-slice";

export const getMyOrders = (axios: Axios) => {
  return async (dispatch: any) => {
    try {
      const res = await axios.get("/my-orders");
      dispatch(orderActions.init({ orders: res.data }));
    } catch (err) {
      toast.error("Something went wrong!");
    }
  };
};

export const getAllOrders = (axios: Axios) => {
  return async (dispatch: any) => {
    try {
      const res = await axios.get("/orders");
      dispatch(orderActions.init({ orders: res.data }));
    } catch (err) {
      toast.error("Something went wrong!");
    }
  };
};

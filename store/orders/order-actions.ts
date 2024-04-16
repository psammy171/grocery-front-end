import { Axios } from "axios";
import toast from "react-hot-toast";
import { OrderByDate, orderActions } from "./order-slice";

export enum OrderType {
  PERSONAL = "/my-orders",
  ALL = "/orders",
}

export const getOrders = (axios: Axios, orderType: OrderType) => {
  return async (dispatch: any) => {
    try {
      const res = await axios.get(orderType);
      const rawOrders = res.data;
      const list: any = {};
      for (const order of rawOrders) {
        list[order.date] = list[order.date]
          ? [...list[order.date], order]
          : [order];
      }
      const orders: OrderByDate[] = [];
      for (const key in list) {
        const newObj = {
          date: key,
          orders: list[key],
        };
        orders.push(newObj);
      }
      orders.sort((a, b) => {
        if (a.date > b.date) return 1;
        if (a.date < b.date) return -1;
        return 0;
      });
      dispatch(
        orderActions.init({
          orders: orders,
        })
      );
    } catch (err) {
      toast.error("Something went wrong!");
    }
  };
};

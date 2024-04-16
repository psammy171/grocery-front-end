import { Axios } from "axios";
import toast from "react-hot-toast";
import { OrderByDate, orderActions } from "./order-slice";

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
      const orders = res.data;
      const list: any = {};
      for (const order of orders) {
        list[order.date] = list[order.date]
          ? [...list[order.date], order]
          : [order];
      }
      const ordersByDate: OrderByDate[] = [];
      for (const key in list) {
        const newObj = {
          date: key,
          orders: list[key],
        };
        ordersByDate.push(newObj);
      }
      ordersByDate.sort((a, b) => {
        if (a.date > b.date) return 1;
        if (a.date < b.date) return -1;
        return 0;
      });
      dispatch(
        orderActions.initOrdersByUser({
          ordersByDate: ordersByDate,
        })
      );
    } catch (err) {
      toast.error("Something went wrong!");
    }
  };
};

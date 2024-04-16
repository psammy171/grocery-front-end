import { Axios } from "axios";
import toast from "react-hot-toast";
import { OrderByUser, orderActions } from "./order-slice";

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
        list[order.user?.email] = list[order.user.email]
          ? [...list[order.user.email], order]
          : [order];
      }
      const ordersByUser: OrderByUser[] = [];
      for (const key in list) {
        const newObj = {
          user: list[key][0].user,
          orders: list[key].map((item: any) => {
            delete item.user;
            return item;
          }),
        };
        ordersByUser.push(newObj);
      }
      ordersByUser.sort((a, b) => {
        if (a.user.email > b.user.email) return 1;
        if (a.user.email < b.user.email) return -1;
        return 0;
      });
      dispatch(
        orderActions.initOrdersByUser({
          ordersByUser: ordersByUser,
        })
      );
    } catch (err) {
      toast.error("Something went wrong!");
    }
  };
};

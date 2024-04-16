"use client";

import OrderDetails from "./order-details";
import useAxios from "@/lib/api/use-axios";
import { useAppDispatch, useAppSelector } from "@/store";
import { OrderType, getOrders } from "@/store/orders/order-actions";
import { useEffect } from "react";

interface Props {
  orderType: OrderType;
}

const AllOrders = ({ orderType }: Props) => {
  const axios = useAxios();
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.orders.loading);
  const orders = useAppSelector((state) => state.orders.orders);

  useEffect(() => {
    dispatch(getOrders(axios, orderType));
  }, [dispatch, axios, orderType]);

  return (
    <div>
      <div className="max-w-[1000px] mx-auto mt-10">
        <p className="text-2xl font-semibold">All orders</p>
        {loading && <p>Loading...</p>}
        {!loading && orders.length === 0 && <p>No orders places yet</p>}
        {!loading && orders.length > 0 && (
          <>
            {orders.map((order) => (
              <div key={order.date}>
                <div className="flex items-center gap-4">
                  <p>{new Date(order.date).toDateString()}</p>
                  <span className="h-[2px] border flex-grow"></span>
                </div>
                <div className="mx-10">
                  {order.orders.map((orderItem) => (
                    <OrderDetails key={orderItem.id} order={orderItem} />
                  ))}
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default AllOrders;

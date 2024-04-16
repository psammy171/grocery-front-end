"use client";

import OrderDetails from "@/app/(main)/(user)/my-orders/order";
import useAxios from "@/lib/api/use-axios";
import { useAppDispatch, useAppSelector } from "@/store";
import { getAllOrders } from "@/store/orders/order-actions";
import { useEffect } from "react";

const AllOrders = () => {
  const axios = useAxios();
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.orders.loading);
  const ordersByUser = useAppSelector((state) => state.orders.ordersByUser);

  useEffect(() => {
    dispatch(getAllOrders(axios));
  }, [dispatch, axios]);

  return (
    <div>
      <div className="max-w-[1000px] mx-auto mt-10">
        <p className="text-2xl font-semibold">All orders</p>
        {loading && <p>Loading...</p>}
        {!loading && ordersByUser.length === 0 && <p>No orders places yet</p>}
        {!loading && ordersByUser.length > 0 && (
          <>
            {ordersByUser.map((orderByUser) => (
              <div key={orderByUser.date}>
                <div className="flex items-center gap-4">
                  <p>{new Date(orderByUser.date).toDateString()}</p>
                  <span className="h-[2px] border flex-grow"></span>
                </div>
                <div className="mx-10">
                  {orderByUser.orders.map((order) => (
                    <OrderDetails key={order.id} order={order} />
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

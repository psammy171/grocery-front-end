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
  const orders = useAppSelector((state) => state.orders.ordres);

  useEffect(() => {
    dispatch(getAllOrders(axios));
  }, [dispatch, axios]);

  return (
    <div>
      <div className="max-w-[1000px] mx-auto mt-10">
        <p className="text-2xl font-semibold">All orders</p>
        {loading && <p>Loading...</p>}
        {!loading && orders.length === 0 && <p>No orders places yet</p>}
        {!loading && orders.length > 0 && (
          <>
            {orders.map((order) => (
              <OrderDetails key={order.id} order={order} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default AllOrders;

"use client";

import useAxios from "@/lib/api/use-axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const DashBoard = () => {
  const axios = useAxios();
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<{
    totalUsers: number;
    totalOrders: number;
    revenue: number;
  }>();

  useEffect(() => {
    const getOverview = async () => {
      try {
        const res = await axios.get("/overview");
        setData(res.data);
      } catch (err) {
        toast.error("Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    getOverview();
  }, [axios]);

  return (
    <div className="max-w-[1000px] mx-auto mt-10">
      <p className="text-2xl font-semibold mb-1">Overview</p>
      <div className="flex mt-3 gap-6">
        <div className="w-72 h-32 border p-2 rounded flex flex-col">
          {!loading && <p className="text-lg font-semibold">Total Orders</p>}
          <div className="flex flex-grow items-center gap-4">
            <span
              className={`w-16 h-16 rounded-full ${
                loading
                  ? "bg-gray-300 animate-pulse"
                  : "bg-primary-50 text-primary-900"
              } flex items-center justify-center`}
            >
              <p className="text-4xl font-bold">{data?.totalOrders}</p>
            </span>
            <p>{!loading && `Total ${data?.totalOrders} orders placed`}</p>
          </div>
        </div>
        <div className="w-72 h-32 border p-2 rounded flex flex-col">
          {!loading && <p className="text-lg font-semibold">Total Users</p>}
          <div className="flex flex-grow items-center gap-4">
            <span
              className={`w-16 h-16 rounded-full ${
                loading
                  ? "bg-gray-300 animate-pulse"
                  : "bg-primary-50 text-primary-900"
              } flex items-center justify-center`}
            >
              <p className="text-4xl font-bold">{data?.totalUsers}</p>
            </span>
            <p>{!loading && `Total ${data?.totalUsers} customers acquired`}</p>
          </div>
        </div>
        <div className="w-72 h-32 border p-2 rounded flex flex-col">
          {!loading && <p className="text-lg font-semibold">Revenue</p>}
          <div className="flex flex-grow items-center gap-4">
            <span
              className={`w-16 h-16 rounded-full ${
                loading
                  ? "bg-gray-300 animate-pulse"
                  : "bg-primary-50 text-primary-900"
              } flex items-center justify-center`}
            >
              <p className="text-xl font-bold">{data?.revenue}</p>
            </span>
            <p>{!loading && `\u20b9 ${data?.revenue} revenue generated`}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;

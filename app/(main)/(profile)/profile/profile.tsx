"use client";

import HomeIcon from "@/components/icons/home";
import HotelIcon from "@/components/icons/hotel";
import OtherIcon from "@/components/icons/other";
import useAxios from "@/lib/api/use-axios";
import { Address } from "@/types/address";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface UserDashboard {
  id: string;
  name: string;
  email: string;
  orderCount: number;
  addresses: Address[];
}

const ProfileDetail = () => {
  const axios = useAxios();
  const [data, setData] = useState<UserDashboard>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const res = await axios.get("/auth/me");
        setData(res.data);
      } catch (err) {
        toast.error("Something went wrong!");
      } finally {
        setLoading(false);
      }
    };
    getUserDetails();
  }, []);

  const getIcon = (label: string) => {
    switch (label.toLocaleLowerCase()) {
      case "house":
        return <HomeIcon className="w-[18px] h-[18px]" />;
      case "home":
        return <HomeIcon className="w-[18px] h-[18px]" />;
      case "office":
        return <HotelIcon className="w-[18px] h-[18px]" />;
      case "work":
        return <HotelIcon className="w-[18px] h-[18px]" />;
      case "hotel":
        return <HotelIcon className="w-[18px] h-[18px]" />;
      default:
        return <OtherIcon className="w-[18px] h-[18px]" />;
    }
  };

  return (
    <div className="max-w-[1000px] mx-auto mt-14">
      <div className="shadow-md mx-32 py-6 rounded bg-gray-50">
        <div
          className={`w-24 h-24 rounded-full mx-auto  flex items-center justify-center ${
            loading ? " bg-gray-300 animate-pulse" : "bg-primary-50"
          }`}
        >
          <p className="text-5xl font-bold text-primary-900">
            {data?.name[0].toUpperCase()}
          </p>
        </div>
        <p
          className={`text-center min-h-9 mt-4 rounded-md mx-auto text-2xl font-bold text-primary-900 ${
            loading && "bg-gray-300 animate-pulse w-44"
          }`}
        >
          {data?.name}
        </p>
        <p
          className={`text-center text-xl mx-auto min-h-6 mt-2 leading-3 ${
            loading && "bg-gray-300 animate-pulse w-72 rounded-sm"
          }`}
        >
          {data?.email}
        </p>
      </div>
      <div className="shadow-md mx-32 py-6 rounded bg-gray-50 mt-4 p-4">
        {!loading ? (
          <p className="text-xl font-bold text-gray-800">Addresses</p>
        ) : (
          <div className="h-7 w-52 bg-gray-300 animate-pulse rounded"></div>
        )}
        {loading &&
          [...Array(3)].map((_: any, idx: number) => (
            <div
              key={idx}
              className="h-20 bg-gray-300 animate-pulse my-2 rounded"
            ></div>
          ))}
        {!loading &&
          data?.addresses.map((address) => (
            <div key={address.id} className="bg-gray-200 my-2 p-3 rounded">
              <span className="flex items-center gap-2">
                {getIcon(address.label)}
                <p className="text-lg font-semibold">
                  {address.label || "Other"}
                </p>
              </span>
              <p className="leading-3">{`${address.addressLineOne}, ${address.addressLineTwo}, ${address.city} ${address.zipcode}`}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProfileDetail;

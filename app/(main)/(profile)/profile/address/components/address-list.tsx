"use client";

import useAxios from "@/lib/api/use-axios";
import { useEffect, useState } from "react";
import AddressItem from "./address-item";
import { useFormContext } from "react-hook-form";
import { Form } from "../page";

const AddressList = () => {
  const axios = useAxios();
  const { watch, setValue } = useFormContext<Form>();
  const addressList = watch("addressList");
  const [fetching, setFetching] = useState<boolean>(true);

  useEffect(() => {
    const getAddresses = async () => {
      try {
        const res = await axios.get("/address");
        setValue("addressList", res.data);
        console.log("List", res.data);
        setFetching(false);
      } catch (err) {
        setFetching(false);
      }
    };
    getAddresses();
  }, [axios, setValue]);

  return (
    <div>
      {fetching &&
        [...Array(10)].map((_: any, idx: number) => (
          <div
            key={idx}
            className="h-20 animate-pulse my-2 rounded-md bg-gray-200"
          ></div>
        ))}
      {!fetching && addressList.length === 0 && <div>No Address added</div>}
      {!fetching &&
        addressList.map((address) => (
          <AddressItem address={address} key={address.id} />
        ))}
    </div>
  );
};

export default AddressList;

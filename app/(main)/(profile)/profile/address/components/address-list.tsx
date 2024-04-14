"use client";

import useAxios from "@/lib/api/use-axios";
import { Address } from "@/types/address";
import { useEffect, useState } from "react";
import AddressItem from "./address-item";

const AddressList = () => {
  const axios = useAxios();
  const [fetching, setFetching] = useState<boolean>(true);
  const [addressList, setAddressList] = useState<Address[]>([]);

  useEffect(() => {
    const getAddresses = async () => {
      try {
        const res = await axios.get("/address");
        setAddressList(res.data);
        setFetching(false);
      } catch (err) {
        setFetching(false);
      }
    };
    getAddresses();
  }, [axios]);

  return (
    <div>
      {fetching &&
        [...Array(10)].map((_: any, idx: number) => (
          <div key={idx} className="h-64 animate-pulse bg-gray-200"></div>
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

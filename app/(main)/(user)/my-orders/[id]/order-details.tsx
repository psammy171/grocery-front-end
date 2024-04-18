"use client";

import { useParams } from "next/navigation";

const OrderDetails = () => {
  const param = useParams();
  return (
    <div>
      <p>Order details for {param.id}</p>
    </div>
  );
};

export default OrderDetails;

import AllOrders from "@/components/order/all-orders";
import { OrderType } from "@/store/orders/order-actions";

const Orders = () => {
  return <AllOrders orderType={OrderType.ALL} />;
};

export default Orders;

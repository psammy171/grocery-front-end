import AllOrders from "@/components/order/all-orders";
import { OrderType } from "@/store/orders/order-actions";

const MyOrders = () => {
  return <AllOrders orderType={OrderType.PERSONAL} />;
};

export default MyOrders;

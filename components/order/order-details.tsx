import ArrowIcon from "@/components/icons/arrow";
import { Order } from "@/store/orders/order-slice";
import { Fragment, useState } from "react";

const OrderDetails = ({ order }: { order: Order }) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="bg-gray-100 rounded border overflow-hidden relative my-3 transition-all">
      <div
        className={`flex px-4 py-2 transition-colors cursor-pointer ${
          open && "border-b bg-primary-100"
        }`}
        onClick={() => setOpen((pre) => !pre)}
      >
        <div className="flex-grow">
          <p>Order Id : {order.id}</p>
          <span className="flex gap-10">
            <p>
              Total : {"\u20b9"} {order.total}
            </p>
            <p>
              Items :{" "}
              {order.items.reduce((curVal, item) => curVal + item.quantity, 0)}
            </p>
            {order.date && <p>Date : {new Date(order.date).toDateString()}</p>}
          </span>
        </div>
        <div className="px-2 flex items-center">
          <span
            className={`h-6 w-6 p-1 rounded-full transition-all duration-300 ${
              open && "rotate-180"
            }`}
          >
            <ArrowIcon className="w-4 h-4" />
          </span>
        </div>
      </div>
      <div
        className={`px-4 w-[500px] mx-auto  transition-all overflow-hidden duration-300 ${
          open ? "max-h-80" : "max-h-0"
        } bottom-0`}
      >
        <div
          className={`transition-all duration-300 py-4 ${
            open ? "translate-y-0" : "-translate-y-full "
          }`}
        >
          <p className="px-2 text-lg font-semibold">Order Items</p>
          <div className="grid grid-cols-5 text-left bg-white rounded p-2">
            <span className="col-span-2 bg-white pl-4 py-1 rounded-l-md font-semibold">
              Item name
            </span>
            <span className="bg-white py-1 font-semibold ml-2 text-right">
              Price
            </span>
            <span className="bg-white py-1 font-semibold text-right">
              Quantity
            </span>
            <span className="bg-white py-1 rounded-r-md font-semibold text-right">
              Item Total
            </span>
            {order.items.map((item) => (
              <Fragment key={item.groceryItemId}>
                <span
                  className="col-span-2 pl-4 truncate"
                  title={item.item.name}
                >
                  {item.item.name}
                </span>
                <span className="ml-2 text-right">
                  {"\u20b9"} {item.item.price}
                </span>
                <span className="text-right mr-1">{item.quantity}</span>
                <span className="text-right">
                  {"\u20b9"} {item.item.price * item.quantity}
                </span>
              </Fragment>
            ))}
          </div>
          {order.user && (
            <div className="pt-4 px-2">
              <p>
                <span className="font-semibold">Ordered By : </span>
                {`${order.user.name} (${order.user.email})`}
              </p>
            </div>
          )}
          {order.address && (
            <div className="pt-2 px-2">
              <p>
                <span className="font-semibold">Delivered at :</span>{" "}
                {`${order.address.addressLineOne}, ${order.address.addressLineTwo}, ${order.address.city}, ${order.address.zipcode}`}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;

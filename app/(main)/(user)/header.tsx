import CartIcon from "@/components/icons/cart";
import OrdersIcon from "@/components/icons/orders";
import StoreIcon from "@/components/icons/store";
import Link from "next/link";

const Header = async () => {
  return (
    <div className="h-12 bg-primary-900">
      <div className="container mx-auto h-full flex px-1 items-center">
        <Link href={"/"}>
          <StoreIcon className="text-white w-5 h-5 cursor-pointer hover:scale-110 transition-all" />
        </Link>
        <p className="mx-2 text-white italic font-semibold">Grocery Store</p>
        <span className="flex-grow"></span>
        <Link href={"/my-orders"}>
          <p className="text-white cursor-pointer hover:scale-105 transition-all">
            Order History
          </p>
        </Link>
        <Link href={"/cart"} className="mx-4">
          <CartIcon className="text-white w-5 h-5 cursor-pointer hover:scale-110 transition-all" />
        </Link>
        <span className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer text-primary-900">
          G
        </span>
      </div>
    </div>
  );
};

export default Header;
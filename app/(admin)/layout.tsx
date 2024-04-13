"use client";

import Link from "next/link";
import "../globals.css";
import StoreIcon from "@/components/icons/store";
import { usePathname } from "next/navigation";
import OrdersIcon from "@/components/icons/orders";
import UserIcon from "@/components/icons/user";
import GroceryIcon from "@/components/icons/grocery";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const pathname = usePathname();
  const drawerItems = [
    {
      title: "Grocery Items",
      path: "/admin/grocery-items",
      icon: <GroceryIcon className="mr-2" />,
    },
    {
      title: "Orders",
      path: "/admin/orders",
      icon: <OrdersIcon className="mr-2" />,
    },
    {
      title: "Users",
      path: "/admin/users",
      icon: <UserIcon className="mr-2" />,
    },
  ];

  return (
    <div className={`flex relative h-screen pt-12`}>
      <div className="h-12 absolute top-0 bg-primary-900 w-full flex items-center px-4">
        <Link href={"/"}>
          <StoreIcon className="text-white w-5 h-5 cursor-pointer hover:scale-110 transition-all" />
        </Link>
        <p className="mx-2 text-white italic font-semibold">Grocery Store</p>
        <span className="flex-grow"></span>
        <span className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer text-primary-900">
          G
        </span>
      </div>
      <div className="h-full w-64 border-r transition-all">
        {drawerItems.map((item) => (
          <div
            key={item.path}
            className={`flex items-center relative m-1 cursor-pointer rounded-sm transition-colors ${
              pathname === item.path
                ? "bg-primary-100"
                : "bg-gray-200 hover:bg-gray-300 text-gray-700"
            }`}
          >
            <div className="p-2 flex-grow">
              <Link href={item.path} className="flex items-center h-full">
                {item?.icon}
                <p>{item.title}</p>
              </Link>
            </div>
            <div
              className={`h-full w-[6px] rounded-l-full absolute top-0 right-0 transition-colors ${
                pathname === item.path ? "bg-primary-900" : "bg-gray-400"
              }`}
            ></div>
          </div>
        ))}
      </div>
      <div className="flex-grow h-full overflow-hidden overflow-y-auto z-10 bg-white">
        {children}
      </div>
    </div>
  );
};

export default Layout;

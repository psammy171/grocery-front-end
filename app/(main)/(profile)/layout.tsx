"use client";

import Link from "next/link";
import "../../globals.css";
import { usePathname } from "next/navigation";
import OrdersIcon from "@/components/icons/orders";
import Logo from "@/components/header/logo";
import Profile from "@/components/header/profile";
import ProfileIcon from "@/components/icons/profile";
import AddressIcon from "@/components/icons/address";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const pathname = usePathname();
  const drawerItems = [
    {
      title: "Profile",
      path: "/profile",
      icon: <ProfileIcon className="mr-2 w-5 h-5" />,
    },
    {
      title: "My Orders",
      path: "/profile/my-orders",
      icon: <OrdersIcon className="mr-2 w-5 h-5" />,
    },
    {
      title: "Address Book",
      path: "/profile/address",
      icon: <AddressIcon className="mr-2 w-5 h-5 p-[1px]" />,
    },
  ];

  return (
    <div className={`flex relative h-screen pt-12`}>
      <div className="h-12 absolute top-0 bg-primary-900 w-full flex items-center px-4">
        <Logo />
        <span className="flex-grow"></span>
        <Profile />
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

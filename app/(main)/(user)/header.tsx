"use client";

import CartIcon from "@/components/icons/cart";
import OrdersIcon from "@/components/icons/orders";
import StoreIcon from "@/components/icons/store";
import Button from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

const Header = () => {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    const closePopup = () => {
      setOpen(false);
    };
    if (open) window.addEventListener("click", closePopup);
    else window.removeEventListener("click", closePopup);
  }, [open]);

  return (
    <div className="h-12 bg-primary-900">
      <div className="container mx-auto h-full flex px-1 items-center">
        <Link href={"/"}>
          <StoreIcon className="text-white w-5 h-5 cursor-pointer hover:scale-110 transition-all" />
        </Link>
        <p className="mx-2 text-white italic font-semibold">Grocery Store</p>
        <span className="flex-grow"></span>
        {status === "authenticated" ? (
          <>
            <Link href={"/my-orders"}>
              <p className="text-white cursor-pointer hover:scale-105 transition-all">
                Order History
              </p>
            </Link>
            <Link href={"/cart"} className="mx-4">
              <CartIcon className="text-white w-5 h-5 cursor-pointer hover:scale-110 transition-all" />
            </Link>
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <span
                className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer text-primary-900 hover:font-semibold hover:bg-gray-300 transition-all "
                onClick={() => setOpen((pre) => !pre)}
              >
                {session?.user.name[0].toUpperCase()}
              </span>
              <div
                className={`absolute right-0 mt-4 shadow-md border rounded-md transition-all ${
                  open ? "visible opacity-100" : "invisible opacity-0"
                }`}
              >
                <Link href={"/profile"}>
                  <div className="flex items-center border-b p-2 gap-2">
                    <span className="w-9 h-9 rounded-full font-semibold text-white flex items-center justify-center bg-primary-900">
                      {session?.user.name[0].toUpperCase()}
                    </span>
                    <div className="pt-1">
                      <p className="leading-3 font-semibold">
                        {session?.user.name}
                      </p>
                      <p className="text-sm">{session?.user.email}</p>
                    </div>
                  </div>
                </Link>
                <div className="m-1">
                  <Button className="w-full m-0">Sign Out</Button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <Link
              href={"/auth/login"}
              className="text-white hover:scale-105 transition-all"
            >
              Login
            </Link>
            <div className="w-[1px] h-6 bg-gray-200 mx-2"></div>
            <Link
              href={"/auth/signup"}
              className="text-white hover:scale-105 transition-all"
            >
              Sign up
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;

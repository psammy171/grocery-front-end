import Link from "next/link";
import "../globals.css";
import { Outfit } from "next/font/google";
import StoreIcon from "@/components/icons/store";

const fontFamily = Outfit({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const drawerItems = [
    { title: "Orders", path: "/admin/orders" },
    { title: "Users", path: "/admin/users" },
    { title: "Grocery Items", path: "/admin/grocery-items" },
  ];

  return (
    <html>
      <body className={`${fontFamily.className} flex relative h-screen pt-12`}>
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
            <div key={item.path}>
              <Link href={item.path}>
                <p>{item.title}</p>
              </Link>
            </div>
          ))}
        </div>
        <div className="flex-grow h-full overflow-hidden overflow-y-auto z-10 bg-white">
          {children}
        </div>
      </body>
    </html>
  );
};

export default Layout;

import Link from "next/link";
import "../globals.css";
import { Outfit } from "next/font/google";

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
  ];

  return (
    <div className={`${fontFamily.className} flex h-screen`}>
      <div className="h-full min-w-64 border-r">
        {drawerItems.map((item) => (
          <div key={item.path}>
            <Link href={item.path}>
              <p>{item.title}</p>
            </Link>
          </div>
        ))}
      </div>
      <div className="flex-grow h-full overflow-hidden overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

export default Layout;

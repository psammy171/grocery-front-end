import Header from "./header";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Header />
      <div className="container mx-auto px-1">{children}</div>
    </>
  );
};

export default Layout;

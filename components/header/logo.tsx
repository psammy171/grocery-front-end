import Link from "next/link";
import StoreIcon from "../icons/store";

const Logo = () => {
  return (
    <>
      <Link href={"/"}>
        <StoreIcon className="text-white w-5 h-5 cursor-pointer hover:scale-110 transition-all" />
      </Link>
      <p className="mx-2 text-white italic font-semibold">Grocery Store</p>
    </>
  );
};

export default Logo;

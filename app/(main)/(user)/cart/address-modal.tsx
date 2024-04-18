import PopUp from "@/components/ui/pop-up";
import useAxios from "@/lib/api/use-axios";
import { Address } from "@/types/address";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import OtherIcon from "@/components/icons/other";
import HomeIcon from "@/components/icons/home";
import HotelIcon from "@/components/icons/hotel";
import Button from "@/components/ui/button";
import { useAppDispatch } from "@/store";
import { checkOutCart } from "@/store/cart/cart-actions";

interface Props {
  open: boolean;
  close: () => void;
}

const AddressModal = ({ open, close }: Props) => {
  const axios = useAxios();
  const dispatch = useAppDispatch();
  const [checkingOut, setCheckingOut] = useState<boolean>(false);
  const [addressList, setAddressList] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<Address | undefined>();

  useEffect(() => {
    const getAddress = async () => {
      try {
        const res = await axios.get("/address");
        setAddressList(res.data);
      } catch (err) {
        toast.error("Something went wrong!");
      }
    };
    getAddress();
  }, [axios]);

  const getIcon = (address: Address) => {
    switch (address.label.toLocaleLowerCase()) {
      case "house":
        return <HomeIcon />;
      case "home":
        return <HomeIcon />;
      case "office":
        return <HotelIcon />;
      case "work":
        return <HotelIcon />;
      case "hotel":
        return <HotelIcon />;
      default:
        return <OtherIcon />;
    }
  };

  const onCheckOutHandler = async () => {
    if (!selectedAddress) {
      toast.error("Please select address");
      return;
    }
    if (checkingOut) return;
    setCheckingOut(true);
    dispatch(checkOutCart(selectedAddress, axios));
  };

  return (
    <PopUp
      open={open}
      close={() => {
        if (checkingOut) return;
        close();
      }}
    >
      <div className="w-96">
        <p className="text-xl font-semibold border-b p-4">Select Address</p>
        {addressList.length === 0 && (
          <div className="flex flex-col gap-2 items-center m-4 ">
            <p>There are no address added in your address book</p>
            <Link href={"/profile/address"}>
              <Button>Add Address</Button>
            </Link>
          </div>
        )}
        {addressList.length > 0 && (
          <div>
            {addressList.map((address) => (
              <div
                key={address.id}
                className={`border rounded-md p-2 m-4 cursor-pointer transition-colors ${
                  selectedAddress?.id === address.id
                    ? "bg-primary-50 ring-2 ring-primary-900"
                    : "hover:bg-gray-100 bg-gray-50"
                }`}
                onClick={() => setSelectedAddress(address)}
              >
                <div className="flex items-center gap-3">
                  {getIcon(address)}
                  <p className="font-semibold text-[17px]">
                    {address.label || "Other"}
                  </p>
                </div>
                <p className="text-[15px]">{`${address.addressLineOne},  ${address.addressLineTwo}`}</p>
                <p className="leading-3 text-[15px]">
                  {address.city}, {address.zipcode}
                </p>
              </div>
            ))}
            <div className="px-4 pb-4">
              <Button
                className="w-full m-0"
                onClick={onCheckOutHandler}
                loading={checkingOut}
              >
                Check out
              </Button>
            </div>
          </div>
        )}
      </div>
    </PopUp>
  );
};

export default AddressModal;

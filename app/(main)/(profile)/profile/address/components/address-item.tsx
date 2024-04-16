import DeleteIcon from "@/components/icons/delete";
import EditIcon from "@/components/icons/edit";
import { Address } from "@/types/address";
import { useFormContext } from "react-hook-form";
import { Form } from "../page";
import DeleteAction from "./delete-action";
import OtherIcon from "@/components/icons/other";
import HomeIcon from "@/components/icons/home";
import HotelIcon from "@/components/icons/hotel";

interface Props {
  address: Address;
}

const AddressItem = ({ address }: Props) => {
  const { setValue } = useFormContext<Form>();

  const onEditHandler = () => {
    setValue("isEditing", true);
    setValue("addressForm", address);
    setValue("open", true);
  };

  const getIcon = () => {
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

  return (
    <>
      <div className="border rounded-md p-4 my-3 bg-gray-50">
        <div className="flex items-center gap-2">
          {getIcon()}
          <p className="font-semibold text-[18px]">
            {address.label || "Other"}
          </p>
          <span className="flex-grow"></span>
          <span
            className="hover:bg-gray-200 px-3 py-[2px] rounded transition-colors cursor-pointer"
            onClick={onEditHandler}
          >
            <p className="text-blue-700 ">Edit</p>
          </span>
          <DeleteAction id={address.id} />
        </div>
        <p>{`${address.addressLineOne},  ${address.addressLineTwo}`}</p>
        <p className="leading-3">
          {address.city}, {address.zipcode}
        </p>
      </div>
    </>
  );
};

export default AddressItem;

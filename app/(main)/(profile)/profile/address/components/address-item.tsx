import DeleteIcon from "@/components/icons/delete";
import EditIcon from "@/components/icons/edit";
import { Address } from "@/types/address";
import { useFormContext } from "react-hook-form";
import { Form } from "../page";
import DeleteAction from "./delete-action";

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

  return (
    <>
      <div className="border rounded-md p-2 my-2 bg-gray-50">
        <div className="flex items-center gap-3">
          <p className="font-semibold">{address.label || "Other"}</p>
          <span className="flex-grow"></span>
          <EditIcon
            className="cursor-pointer text-gray-900 hover:text-gray-900/80 transition-colors"
            onClick={onEditHandler}
          />
          <DeleteAction id={address.id} />
        </div>
        <p className="text-sm">{`${address.addressLineOne},  ${address.addressLineTwo}`}</p>
        <p className="text-sm leading-3">
          {address.city}, {address.zipcode}
        </p>
      </div>
    </>
  );
};

export default AddressItem;

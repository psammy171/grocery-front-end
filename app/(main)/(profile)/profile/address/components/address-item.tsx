import DeleteIcon from "@/components/icons/delete";
import EditIcon from "@/components/icons/edit";
import { Address } from "@/types/address";

interface Props {
  address: Address;
}

const AddressItem = ({ address }: Props) => {
  return (
    <>
      <div className="border rounded-md p-2 my-2 bg-gray-50 relative">
        <p className="font-semibold">{address.label || "Other"}</p>
        <p className="text-sm">{`${address.addressLineOne},  ${address.addressLineTwo}`}</p>
        <p className="text-sm leading-3">
          {address.city}, {address.zipcode}
        </p>
        <EditIcon className="absolute top-1 right-9 cursor-pointer text-gray-900 hover:text-gray-900/80 transition-colors" />
        <DeleteIcon className="absolute top-1 right-3 cursor-pointer text-error hover:text-error/80 transition-colors" />
      </div>
    </>
  );
};

export default AddressItem;

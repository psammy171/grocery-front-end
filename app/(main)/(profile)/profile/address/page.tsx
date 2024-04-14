import AddIcon from "@/components/icons/add";
import AddressList from "./components/address-list";

const Address = () => {
  return (
    <div className="max-w-lg mx-auto p-1">
      <div className="flex items-center justify-between">
        <p className="text-2xl my-4 font-semibold">Address Book</p>
        <AddIcon className="w-5 h-5 cursor-pointer text-gray-800" />
      </div>
      <AddressList />
    </div>
  );
};

export default Address;

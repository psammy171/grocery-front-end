"use client";

import AddIcon from "@/components/icons/add";
import AddressList from "./components/address-list";
import { FormProvider, useForm } from "react-hook-form";
import { Address } from "@/types/address";
import AddressForm from "./components/address-form";

export interface Form {
  addressList: Address[];
  addressForm: Address;
  open: boolean;
  isEditing: boolean;
}

const AddressComponent = () => {
  const methods = useForm<Form>({
    defaultValues: {
      open: false,
      isEditing: false,
      addressList: [],
      addressForm: {
        zipcode: "",
        addressLineOne: "",
        addressLineTwo: "",
        city: "",
        label: "",
      },
    },
  });
  const { setValue } = methods;

  return (
    <div className="max-w-lg mx-auto p-1">
      <FormProvider {...methods}>
        <div className="flex items-center justify-between">
          <p className="text-2xl my-4 font-semibold">Address Book</p>
          <span className="w-6 h-6 p-1 rounded-full hover:bg-gray-300 group transition-colors">
            <AddIcon
              className="w-4 h-4 cursor-pointer text-gray-500 group-hover:text-gray-800"
              onClick={() => {
                setValue("isEditing", false);
                setValue("open", true);
              }}
            />
          </span>
        </div>
        <AddressList />
        <AddressForm />
      </FormProvider>
    </div>
  );
};

export default AddressComponent;

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
    <div className="max-w-[1000px] mx-auto mt-10">
      <FormProvider {...methods}>
        <div className="flex items-center justify-between">
          <p className="text-2xl font-semibold mb-1">Address Book</p>
          <span
            className=" py-1 px-2 rounded flex items-center gap-1 border-2 border-primary-900 text-primary-900 cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => {
              setValue("isEditing", false);
              setValue("open", true);
            }}
          >
            <AddIcon className="w-[14px] h-[14px]" />
            <p>Add Address</p>
          </span>
        </div>
        <AddressList />
        <AddressForm />
      </FormProvider>
    </div>
  );
};

export default AddressComponent;

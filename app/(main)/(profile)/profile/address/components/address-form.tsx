import { useFormContext } from "react-hook-form";
import { Form } from "../page";
import PopUp from "@/components/ui/pop-up";
import Input from "@/components/ui/input";
import Label from "@/components/ui/label";
import Button from "@/components/ui/button";
import useAxios from "@/lib/api/use-axios";
import { Address } from "@/types/address";
import toast from "react-hot-toast";
import { FormEvent } from "react";

const AddressForm = () => {
  const axios = useAxios();
  const { watch, setValue, getValues, register } = useFormContext<Form>();
  const open = watch("open");
  const isEditing = watch("isEditing");
  const address: Address = watch("addressForm");

  const close = () => {
    setValue("open", false);
    setValue("isEditing", false);
    setValue("addressForm", {
      id: "",
      addressLineOne: "",
      addressLineTwo: "",
      city: "",
      zipcode: "",
      label: "",
    });
  };

  const updateAddress = async () => {
    try {
      const res = await axios.patch(`/address/${address.id}`, address);
      const resAddress = res.data as Address;
      setValue(
        "addressList",
        getValues("addressList").map((address) => {
          if (address.id === resAddress.id) {
            return resAddress;
          }
          return address;
        })
      );
      close();
      toast.success("Address updated successfully");
    } catch (err) {
      toast.error("Something went wrong! Please try again");
    }
  };

  const createAddress = async () => {
    try {
      const { id, ...newAddress } = { ...address };
      const res = await axios.post(`/address/`, newAddress);
      const resAddress = res.data as Address;
      setValue("addressList", [resAddress, ...getValues("addressList")]);
      close();
      toast.success("Address created successfully");
    } catch (err) {
      toast.error("Something went wrong! Please try again");
    }
  };

  const onSubmitHandler = (e: FormEvent) => {
    e.preventDefault();
    if (isEditing) updateAddress();
    else createAddress();
  };

  return (
    <PopUp open={open} close={close}>
      <form className=" rounded w-96" onSubmit={onSubmitHandler}>
        <p className="text-center font-semibold text-xl border-b py-2">
          Address
        </p>
        <div className="p-4 border-b">
          <Label inputLabel={"Label"} />
          <Input placeholder="Label" {...register("addressForm.label")} />
          <Label inputLabel={"Street"} className="mt-4" />
          <Input
            placeholder="Street"
            {...register("addressForm.addressLineOne")}
          />
          <Label inputLabel={"Landmark"} className="mt-4" />
          <Input
            placeholder="Landmark"
            {...register("addressForm.addressLineTwo")}
          />
          <Label inputLabel={"City"} className="mt-4" />
          <Input placeholder="City" {...register("addressForm.city")} />
          <Label inputLabel={"Zip code"} className="mt-4" />
          <Input placeholder="Zipcode" {...register("addressForm.zipcode")} />
        </div>
        <div className="py-3 px-5">
          <Button className="w-full m-0">Save</Button>
        </div>
      </form>
    </PopUp>
  );
};

export default AddressForm;

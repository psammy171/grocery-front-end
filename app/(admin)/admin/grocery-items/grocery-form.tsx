"use client";

import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Label from "@/components/ui/label";
import { useAppDispatch } from "@/store";
import { addItem } from "@/store/items/item-actions";
import { Item } from "@/types/Item";
import { Axios } from "axios";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

interface Props {
  axios: Axios;
  close: () => void;
}

const GroceryForm = ({ axios, close }: Props) => {
  const dispatch = useAppDispatch();
  const nameRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const isActiveRef = useRef<HTMLInputElement>(null);
  const [saving, setSaving] = useState<boolean>(false);

  const onSaveHandler = () => {
    const name = nameRef.current!.value;
    const price = parseFloat(priceRef.current!.value);
    const isChecked = isActiveRef.current!.checked;
    if (name.length === 0 || name.length < 3) {
      toast.error("name should be minimum 3 characters");
      return;
    }
    if (isNaN(price)) {
      toast.error("Please enter valid price");
      return;
    }
    if (price < 1) {
      toast.error("Price should be positive value");
      return;
    }
    const newItem: Item = {
      id: "",
      name,
      price,
      archived: isChecked,
    };
    // setSaving(true);
    dispatch(addItem(axios, newItem));
    close();
    nameRef.current!.value = "";
    priceRef.current!.value = "";
    isActiveRef.current!.checked = false;
  };

  return (
    <div className={` relative w-72 bg-white p-4`}>
      <Label inputLabel="Item name" />
      <Input ref={nameRef} placeholder="Item name" />
      <Label inputLabel="Price" />
      <Input type={"number"} placeholder="Item price" ref={priceRef} />
      <label className="flex items-center m-2 mt-3 gap-2 cursor-pointer">
        <input
          type="checkbox"
          ref={isActiveRef}
          className="rounded-sm text-primary-900 cursor-pointer focus:ring-primary-900"
        />
        <p>Disabled</p>
      </label>

      <div className="flex justify-end">
        <Button
          loading={saving}
          onClick={onSaveHandler}
          className="disabled:cursor-not-allowed disabled:bg-primary-200 disabled:border-primary-200"
        >
          Add
        </Button>
      </div>
    </div>
  );
};

export default GroceryForm;

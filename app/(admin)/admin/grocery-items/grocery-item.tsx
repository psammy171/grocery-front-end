"use client";

import CloseIcon from "@/components/icons/close";
import EditIcon from "@/components/icons/edit";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Label from "@/components/ui/label";
import { useAppDispatch } from "@/store";
import { updateItem } from "@/store/items/item-actions";
import { Item } from "@/types/Item";
import { Axios } from "axios";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

const GroceryItem = ({ item, axios }: { item: Item; axios: Axios }) => {
  const dispatch = useAppDispatch();
  const nameRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const isActiveRef = useRef<HTMLInputElement>(null);
  const [saving, setSaving] = useState<boolean>(false);
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const isDisabled = !isEditable || saving;

  useEffect(() => {
    if (!isEditable && !saving) {
      nameRef.current!.value = item.name;
      priceRef.current!.value = item.price.toString();
      isActiveRef.current!.checked = item.archived;
    }
  }, [isEditable, saving, item]);

  useEffect(() => {
    nameRef.current!.value = item.name;
    priceRef.current!.value = item.price.toString();
    isActiveRef.current!.checked = item.archived;
    setIsEditable(false);
    setSaving(false);
  }, [item]);

  const onSaveHandler = () => {
    const name = nameRef.current!.value;
    const price = parseFloat(priceRef.current!.value);
    const isChecked = isActiveRef.current!.checked;
    if (name.length === 0 || name.length < 3) {
      toast.error("name should be minimum 3 characters");
      return;
    }
    if (price < 1) {
      toast.error("Price should be positive value");
      return;
    }
    const newItem: Item = {
      id: item.id,
      name,
      price,
      archived: isChecked,
    };
    setSaving(true);
    dispatch(updateItem(axios, newItem));
  };

  return (
    <div
      className={`border relative w-72 rounded bg-white p-4 ${
        !isDisabled ? "ring-2 ring-primary-900" : ""
      }`}
    >
      {!saving && (
        <>
          {isEditable ? (
            <CloseIcon
              className="absolute w-5 h-5 text-gray-500 hover:text-gray-700 top-2 right-3 cursor-pointer"
              onClick={() => setIsEditable(false)}
            />
          ) : (
            <EditIcon
              className="absolute top-2 right-3 cursor-pointer text-gray-500 hover:text-gray-700"
              onClick={() => setIsEditable(true)}
            />
          )}
        </>
      )}
      <Label inputLabel="Item name" />
      <Input
        disabled={isDisabled}
        ref={nameRef}
        className={`${isEditable ? "bg-white" : ""}`}
      />
      <Label inputLabel="Price" />
      <Input type={"number"} ref={priceRef} disabled={isDisabled} />
      <label className="flex items-center m-2 mt-3 gap-2 cursor-pointer">
        <input
          type="checkbox"
          disabled={isDisabled}
          defaultChecked={item.archived}
          ref={isActiveRef}
          className="rounded-sm text-primary-900 focus:ring-primary-900"
        />
        <p>Active</p>
      </label>

      <div className="flex justify-end">
        <Button
          disabled={isDisabled}
          loading={saving}
          onClick={onSaveHandler}
          className="disabled:cursor-not-allowed disabled:bg-primary-200 disabled:border-primary-200"
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default GroceryItem;

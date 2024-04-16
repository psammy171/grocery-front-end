import DeleteIcon from "@/components/icons/delete";
import PopUp from "@/components/ui/pop-up";
import useAxios from "@/lib/api/use-axios";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import toast from "react-hot-toast";
import { Form } from "../page";
import Button from "@/components/ui/button";

interface Props {
  id: string;
}

const DeleteAction = ({ id }: Props) => {
  const axios = useAxios();
  const [deleting, setDeleting] = useState<boolean>(false);
  const { setValue, getValues } = useFormContext<Form>();
  const [open, setOpen] = useState<boolean>(false);

  const onConfirm = async () => {
    if (deleting) return;
    try {
      await axios.delete(`/address/${id}`);
      setOpen(false);
      setValue(
        "addressList",
        getValues("addressList").filter((address) => address.id !== id)
      );
      toast.success("Address deleted successfully!");
    } catch (err) {
      toast.error("Something went wrong! Please try again later");
      setOpen(false);
    }
  };

  const onCancel = () => {
    if (deleting) return;
    setOpen(false);
  };

  return (
    <>
      <span
        className="hover:bg-gray-200 px-3 py-[2px] rounded transition-colors cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <p className="text-error">Delete</p>
      </span>
      <PopUp open={open} close={() => setOpen(false)}>
        <div className="py-4 px-4">
          <p className="mx-1 mt-2">Are you sure want to delete address ?</p>
          <div className="flex mt-2">
            <Button
              className="flex-grow"
              variant="secondary"
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button
              className="flex-grow bg-error border-error"
              onClick={onConfirm}
              loading={deleting}
            >
              Delete
            </Button>
          </div>
        </div>
      </PopUp>
    </>
  );
};

export default DeleteAction;

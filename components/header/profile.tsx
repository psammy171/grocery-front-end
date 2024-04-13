import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Button from "../ui/button";

const Profile = () => {
  const { data: session } = useSession();
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    const closePopup = () => {
      setOpen(false);
    };
    if (open) window.addEventListener("click", closePopup);
    else window.removeEventListener("click", closePopup);
  }, [open]);

  return (
    <div className="relative" onClick={(e) => e.stopPropagation()}>
      <span
        className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer text-primary-900 hover:font-semibold hover:bg-gray-300 transition-all "
        onClick={() => setOpen((pre) => !pre)}
      >
        {session?.user.name[0].toUpperCase()}
      </span>
      <div
        className={`absolute right-0 mt-4 shadow-md border rounded-md transition-all z-20 bg-white ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <Link href={"/profile"}>
          <div className="flex items-center border-b p-2 gap-2">
            <span className="w-9 h-9 rounded-full font-semibold text-white flex items-center justify-center bg-primary-900">
              {session?.user.name[0].toUpperCase()}
            </span>
            <div className="pt-1">
              <p className="leading-3 font-semibold">{session?.user.name}</p>
              <p className="text-sm">{session?.user.email}</p>
            </div>
          </div>
        </Link>
        <div className="m-1">
          <Button className="w-full m-0">Sign Out</Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;

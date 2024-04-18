import Button from "@/components/ui/button";
import useAxios from "@/lib/api/use-axios";
import { useAppDispatch } from "@/store";
import { makeUserAdmin, removeUserAsAdmin } from "@/store/users/user-actions";
import { User } from "@/store/users/user-slice";
import { useSession } from "next-auth/react";

interface Props {
  user: User;
  isCurrentUserSuperAdmin: boolean;
}

const UserDetails = ({ user, isCurrentUserSuperAdmin }: Props) => {
  const axios = useAxios();
  const dispatch = useAppDispatch();
  const isAdmin = !!user.roles.find((role) => role.role === "ADMIN");

  const getRole = (role: string) => {
    switch (role) {
      case "ADMIN":
        return (
          <p className="border-2 border-green-600 bg-green-50 text-green-600  px-3 py-1 rounded mr-2">
            Admin
          </p>
        );
      case "SUPER_ADMIN":
        return (
          <p className="border-2 border-blue-600 bg-blue-50 text-blue-600  px-3 py-1 rounded mr-2">
            Super Admin
          </p>
        );
    }
  };

  const makeAdmin = () => {
    dispatch(makeUserAdmin(axios, user.email));
  };

  const removeAdmin = () => {
    dispatch(removeUserAsAdmin(axios, user.email));
  };

  return (
    <div className="border rounded bg-gray-100 px-4 py-2 my-1">
      <div className="flex">
        <div>
          <p className="font-semibold text-[18px]">{user.name}</p>
          <p className="leading-3 text-gray-700">{user.email}</p>
        </div>
        <span className="flex-grow"></span>
        {isCurrentUserSuperAdmin &&
          !user.roles.find((role) => role.role === "SUPER_ADMIN") && (
            <>
              {isAdmin ? (
                <Button onClick={removeAdmin}>Remove as Admin</Button>
              ) : (
                <Button onClick={makeAdmin}>Make Admin</Button>
              )}
            </>
          )}
      </div>
      <div className="mt-2">
        {user.roles.find(
          (role) => role.role === "ADMIN" || role.role === "SUPER_ADMIN"
        ) && <p className="font-semibold">Roles</p>}
        <div className="flex">
          {user.roles.map((role) => (
            <div key={role.id}>{getRole(role.role)}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserDetails;

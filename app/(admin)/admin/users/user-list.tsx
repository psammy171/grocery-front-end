"use client";

import useAxios from "@/lib/api/use-axios";
import { useAppDispatch, useAppSelector } from "@/store";
import { getAllUser } from "@/store/users/user-actions";
import { useEffect } from "react";
import UserDetails from "./user-details";
import { useSession } from "next-auth/react";

const UserList = () => {
  const axios = useAxios();
  const { data: session } = useSession();
  const isSuperAdmin = session
    ? !!session?.user.roles.find((role) => role.role === "SUPER_ADMIN")
    : false;
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.users.loading);
  const users = useAppSelector((state) => state.users.users);

  useEffect(() => {
    dispatch(getAllUser(axios));
  }, [axios, dispatch]);

  return (
    <div className="max-w-[1000px] mx-auto mt-10">
      <p className="text-2xl font-semibold mb-1">Users list</p>
      {loading && <p>Loading...</p>}
      {!loading && (
        <>
          {users.map((user) => (
            <div key={user.id} className="pb-1">
              <UserDetails user={user} isCurrentUserSuperAdmin={isSuperAdmin} />
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default UserList;

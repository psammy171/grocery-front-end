import { Address } from "@/types/address";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type User = {
  id: string;
  name: string;
  email: string;
  addresses: Address[];
  roles: {
    id: string;
    role: string;
  }[];
};

type SliceType = {
  loading: boolean;
  users: User[];
};

const initialState: SliceType = {
  loading: true,
  users: [],
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    init: (state, action: PayloadAction<{ users: User[] }>) => {
      state.loading = false;
      state.users = action.payload.users;
    },
    makeAdmin: (state, action: PayloadAction<{ email: string }>) => {
      const email = action.payload.email;
      state.users = state.users.map((user) => {
        if (user.email === email) {
          const newUser: User = {
            ...user,
            roles: [...user.roles, { id: "", role: "ADMIN" }],
          };
          return newUser;
        }
        return user;
      });
    },
    removeUserAsAdmin: (state, action: PayloadAction<{ email: string }>) => {
      const email = action.payload.email;
      state.users = state.users.map((user) => {
        if (user.email === email) {
          const newUser: User = {
            ...user,
            roles: user.roles.filter((role) => role.role !== "ADMIN"),
          };
        }
        return user;
      });
    },
  },
});

export const userActions = usersSlice.actions;

export default usersSlice;

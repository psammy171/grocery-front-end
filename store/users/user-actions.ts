import { Axios } from "axios";
import toast from "react-hot-toast";
import { userActions } from "./user-slice";

export const getAllUser = (axios: Axios) => {
  return async (dispatch: any) => {
    try {
      const res = await axios.get("/users");
      dispatch(userActions.init({ users: res.data }));
    } catch {
      toast.error("Something went wrong!");
    }
  };
};

export const makeUserAdmin = (axios: Axios, email: string) => {
  return async (dispatch: any) => {
    try {
      await axios.post("/users/make-admin", {
        email,
      });
      dispatch(
        userActions.makeAdmin({
          email: email,
        })
      );
    } catch (err) {
      toast.error("Something went wrong!");
    }
  };
};

export const removeUserAsAdmin = (axios: Axios, email: string) => {
  return async (dispatch: any) => {
    try {
      await axios.post("/users/remove-admin", {
        email,
      });
      dispatch(
        userActions.removeUserAsAdmin({
          email: email,
        })
      );
    } catch (err) {
      toast.error("Something went wrong!");
    }
  };
};

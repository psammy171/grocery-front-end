import { signIn, useSession } from "next-auth/react";
import { axiosAuth } from "./axios";

const useRefreshToken = () => {
  const { data: session, update } = useSession();

  const refreshToken = async () => {
    try {
      const res = await axiosAuth.get("/refresh-token", {
        headers: {
          Authorization: `Bearer ${session?.user.refreshToken}`,
        },
      });
      if (session) {
        update({
          ...session,
          user: {
            ...session.user,
            accessToken: res.data.accessToken,
          },
        });
        session.user.accessToken = res.data.accessToken;
      } else {
        signIn();
      }
    } catch (err) {
      signIn();
    }
  };

  return refreshToken;
};

export default useRefreshToken;

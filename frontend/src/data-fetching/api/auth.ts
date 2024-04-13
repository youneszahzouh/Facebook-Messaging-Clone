import {
  UseInfiniteQueryOptions,
  useInfiniteQuery,
  useMutation,
} from "@tanstack/react-query";
import client from "../client/client";
import Cookies from "js-cookie";

export type AuthResponse = {
  accessToken: string;
  refreshToken: string;
  userId: string;
};

export function useLogin() {
  const mutation = useMutation({
    mutationFn: client.auth.login,
    onSuccess: (data) => {
      if (!data?.accessToken) {
        return;
      }
      Cookies.set("accessToken", data.accessToken);
      Cookies.set("refreshToken", data.refreshToken);
      Cookies.set("userId", data.userId);
    },
    onError: (error: Error) => {
      console.log(error.message);
    },
  });

  return mutation;
}

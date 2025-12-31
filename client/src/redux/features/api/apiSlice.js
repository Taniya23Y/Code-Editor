/* eslint-disable no-unused-vars */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Mutex } from "async-mutex";
import { setCredentials, logoutState } from "../auth/authSlice";

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl: "https://code-compiler-d1xb.onrender.com/api/auth",
  credentials: "include",
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();

  let result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const refreshResult = await baseQuery(
          { url: "/refresh", method: "POST" },
          api,
          extraOptions
        );

        if (refreshResult?.data?.accessToken) {
          api.dispatch(
            setCredentials({
              accessToken: refreshResult.data.accessToken,
              user: api.getState().auth.user,
              roles: api.getState().auth.roles,
            })
          );

          result = await baseQuery(args, api, extraOptions);
        } else {
          api.dispatch(logoutState());
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Auth", "User"],
  endpoints: (builder) => ({}),
});

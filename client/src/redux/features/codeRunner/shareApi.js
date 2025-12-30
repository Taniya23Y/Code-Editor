import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const shareApi = createApi({
  reducerPath: "shareApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_SERVER_URL,
  }),
  endpoints: (builder) => ({
    saveCode: builder.mutation({
      query: (data) => ({
        url: "/api/share/save",
        method: "POST",
        body: data,
      }),
    }),
    getCode: builder.query({
      query: (shareId) => `/api/share/${shareId}`,
    }),
  }),
});

export const { useSaveCodeMutation, useGetCodeQuery } = shareApi;

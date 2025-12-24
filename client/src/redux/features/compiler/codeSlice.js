import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const codeSlice = createApi({
  reducerPath: "code",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_SERVER_URL,
    credentials: "include",
  }),
  tagTypes: ["myCodes", "allCodes"],
  endpoints: (builder) => ({
    saveCode: builder.mutation({
      query: (body) => ({
        url: "/compiler/save",
        method: "POST",
        body,
      }),
      invalidatesTags: ["myCodes", "allCodes"],
    }),

    loadCode: builder.mutation({
      query: (body) => ({
        url: "/compiler/load",
        method: "POST",
        body,
      }),
    }),

    getMyCodes: builder.query({
      query: () => "/compiler/my-codes",
      providesTags: ["myCodes"],
    }),

    deleteCode: builder.mutation({
      query: (id) => ({
        url: `/compiler/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["myCodes", "allCodes"],
    }),

    editCode: builder.mutation({
      query: ({ fullCode, id, title }) => ({
        url: `/compiler/edit/${id}`,
        method: "PUT",
        body: {
          fullCode,
          title,
        },
      }),
    }),

    getAllCodes: builder.query({
      query: () => ({
        url: "/compiler/get-all-codes",
        cache: "no-store",
      }),
      providesTags: ["allCodes"],
    }),
  }),
});

export const {
  useSaveCodeMutation,
  useLoadCodeMutation,
  useGetMyCodesQuery,
  useDeleteCodeMutation,
  useEditCodeMutation,
  useGetAllCodesQuery,
} = codeSlice;

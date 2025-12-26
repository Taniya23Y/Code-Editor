import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const languageCodeApi = createApi({
  reducerPath: "languageCodeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_SERVER_URL,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    saveLanguageCode: builder.mutation({
      query: (data) => ({
        url: "/api/language-code/save",
        method: "POST",
        body: data,
      }),
    }),

    getLanguageCode: builder.query({
      query: (id) => `/api/language-code/${id}`,
    }),

    updateLanguageCode: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/api/language-code/${id}`,
        method: "PUT",
        body: data,
      }),
    }),

    getMyLanguageCodes: builder.query({
      query: () => "/api/language-code/my-langCodes",
    }),
  }),
});

export const {
  useSaveLanguageCodeMutation,
  useGetLanguageCodeQuery,
  useUpdateLanguageCodeMutation,
  useGetMyLanguageCodesQuery,
} = languageCodeApi;

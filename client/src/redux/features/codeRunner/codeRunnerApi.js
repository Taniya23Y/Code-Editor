import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const codeRunnerApi = createApi({
  reducerPath: "codeRunnerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_SERVER_URL,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    runCode: builder.mutation({
      query: ({ sourceCode, language, input }) => ({
        url: "/api/code-runner/run",
        method: "POST",
        body: { sourceCode, language, input },
      }),
    }),
  }),
});

export const { useRunCodeMutation } = codeRunnerApi;

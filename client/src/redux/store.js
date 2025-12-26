import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import compilerReducer from "./features/compiler/compilerSlice";

import { apiSlice } from "./features/api/apiSlice";
import { codeSlice } from "./features/compiler/codeSlice";
import { codeRunnerApi } from "./features/codeRunner/codeRunnerApi";
import { shareApi } from "./features/codeRunner/shareApi";
import { languageCodeApi } from "./features/codeRunner/languageCodeApi";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [codeSlice.reducerPath]: codeSlice.reducer,
    [codeRunnerApi.reducerPath]: codeRunnerApi.reducer,
    [shareApi.reducerPath]: shareApi.reducer,
    [languageCodeApi.reducerPath]: languageCodeApi.reducer,

    auth: authReducer,
    compiler: compilerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      apiSlice.middleware,
      codeSlice.middleware,
      codeRunnerApi.middleware,
      shareApi.middleware,
      languageCodeApi.middleware
    ),
});

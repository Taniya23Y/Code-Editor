import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import compilerReducer from "./features/compiler/compilerSlice";

import { apiSlice } from "./features/api/apiSlice";
import { codeSlice } from "./features/compiler/codeSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [codeSlice.reducerPath]: codeSlice.reducer,

    auth: authReducer,
    compiler: compilerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware, codeSlice.middleware),
});

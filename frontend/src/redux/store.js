import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiSlice } from "./apis/apiSlice";
import authReducer from "./features/auth/authSlice";


const store = configureStore({
    reducer : {
        [apiSlice.reducerPath] : apiSlice.reducer,
        //by below we connected authSlice to store
        auth: authReducer
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
});

setupListeners(store.dispatch)

export default store
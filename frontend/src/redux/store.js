import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiSlice } from "./apis/apiSlice";
import authReducer from "./features/auth/authSlice";
import favoritesReducer from "./features/favorites/favoriteSlice"
import {getFavoritesFromLocalStorage} from "../Utility/localStorage"

const initialFavorites = getFavoritesFromLocalStorage() || []


const store = configureStore({
    reducer : {
        [apiSlice.reducerPath] : apiSlice.reducer,
        //by below we connected authSlice to store, favorites to store
        auth: authReducer,
        favorites: favoritesReducer
    },

    preloadedState :  {
        favorites: initialFavorites
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
});

setupListeners(store.dispatch)

export default store
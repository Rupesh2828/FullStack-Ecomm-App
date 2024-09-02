import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiSlice } from "./apis/apiSlice";
import authReducer from "./features/auth/authSlice";
import favoritesReducer from "./features/favorites/favoriteSlice";
import cartSliceReducer from "../redux/cart/cartSlice";
import shopSliceReducer from "../redux/features/shop/shopSlice"
import { getFavoritesFromLocalStorage } from "../Utility/localStorage";

const initialFavorites = getFavoritesFromLocalStorage() || [];

//reducerPath is a property of apiSlice, which is typically created using createApi from Redux Toolkit's @reduxjs/toolkit/query library

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    //by below we connected authSlice to store and favorites to store
    auth: authReducer,
    favorites: favoritesReducer,
    cart: cartSliceReducer,
    shop : shopSliceReducer
  },

  preloadedState: {
    favorites: initialFavorites,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

setupListeners(store.dispatch);

export default store;

//In this case, [apiSlice.reducerPath]: apiSlice.reducer is dynamically setting the key in the store's state to whatever the value of reducerPath is.

//These reducers are manually named (auth, favorites) and don't use the dynamic key pattern that apiSlice.reducerPath uses.

//apiSlice.middleware is middleware generated by createApi from Redux Toolkit's @reduxjs/toolkit/query library.
//By using .concat(apiSlice.middleware), you are adding this middleware to the array of default middleware.

//The middleware option ensures that the default middleware and the middleware from apiSlice are both included in the store.
// This setup is crucial for making sure that API requests managed by apiSlice are correctly handled by Redux, alongside the other functionality provided by the default middleware.
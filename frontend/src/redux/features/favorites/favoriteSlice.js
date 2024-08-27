import { createSlice } from "@reduxjs/toolkit";

const favoriteSlice = createSlice({
    name: "favorites",
    initialState: [],
    reducers: {
        addToFavorites : (state, action) => {
            //Checking is product is not already favorite

            if (!state.some((product) => product._id === action.payload._id)) {
                state.push(action.payload)
            }
        },
        removeFromFavorites : (state, action) => {
            //Remove the product with matching id
            return state.filter((product) => product._id !== action.payload._id)
        },

        setFavorites : (state, action) => {
            //set favorites from localstorage
            return action.payload
        }
    }
})

export const {addToFavorites, removeFromFavorites,setFavorites} = favoriteSlice.actions;
export const selectfavoriteProduct = (state) => state.favorites
export default favoriteSlice.reducer;
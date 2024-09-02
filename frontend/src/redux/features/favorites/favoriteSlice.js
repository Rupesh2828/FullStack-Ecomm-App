import { createSlice } from "@reduxjs/toolkit";

const favoriteSlice = createSlice({
    name: "favorites",
    initialState: [],
    reducers: {
        addToFavorites : (state, action) => {
            //Checking if product is not already favorite

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

//for addtofav
//Checking for Duplicates: The some method checks if there is already a product in the favorites list with the same _id as the one being added (action.payload._id).
// Reason for _id: Using _id helps to accurately determine whether the product is already in the list, avoiding duplicates. If the _id is unique, it ensures that each product can be added only once.

//forremovefav
//Filtering Products: The filter method creates a new array excluding the product with the _id matching action.payload._id.
// Reason for _id: This ensures that the specific product is removed from the favorites list based on its unique identifier. It allows precise targeting of the item to be removed.
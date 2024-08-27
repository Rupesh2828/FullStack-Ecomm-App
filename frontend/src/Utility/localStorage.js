//Add item to localstorage
export const addFavoritesToLocalStorage = (product) => {
     const favorites = getFavoritesFromLocalStorage() 
     if (!favorites.some((p) => p._id === product._id)) {
         favorites.push(product)
        localStorage.setItem("favorites", JSON.stringify(favorites))
     }
}

//Remove product from localstorage 

export const removewFavoritesFromLocalStorage = (productId) => {
    const favorites = getFavoritesFromLocalStorage() 
    const upadateFavorites = favorites.filter((product) =>  product._id !== productId)

    localStorage.setItem("favorites", JSON.stringify(upadateFavorites))

}


//retrive favorites from localStorage

export const getFavoritesFromLocalStorage = () => {
    const favoritesJSON = localStorage.getItem("favorites")
    return favoritesJSON ? JSON.parse(favoritesJSON) : []
}


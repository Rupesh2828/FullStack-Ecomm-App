// With RTK Query, the logic for managing cached data is centralized into a single "API slice" per application. In much the same way that you have a single Redux store per app, we now have a single slice for all our cached data.

// createApi -> React-specific entry point that automatically generates
import {fetchBaseQuery, createApi}  from "@reduxjs/toolkit/query/react"

import {BASE_URL} from "../constants.js"

// baseQuery: a function that knows how to fetch data from the server
const baseQuery = fetchBaseQuery({baseUrl: BASE_URL})

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ["Product" , "Order", "User", "Category"],
    endpoints : () => ({})
})

//Endpoints can be queries, which return data for caching, or mutations, which send an update to the server.
//The endpoints are defined using a callback function that accepts a builder parameter and returns an object containing endpoint definitions created with builder.query() and builder.mutation().
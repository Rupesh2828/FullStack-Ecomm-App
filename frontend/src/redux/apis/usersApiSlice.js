import {apiSlice} from "./apiSlice"
import { USERS_URL } from "../constants.js"

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url : `${USERS_URL}/login`,
                method: "POST",
                body: data
            })
        })
    })
})

//so here for export useLoginMutation decodes `use${login}mutation` from above endpoint.

export const {useLoginMutation} = userApiSlice

//here http:localhost:5000 the USERS_URL =/api/users then login so it goes like this
// http://localhost:5000/api/users/login
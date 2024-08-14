import { createSlice } from "@reduxjs/toolkit";

//we r providing userinfo in initialstate, if we have userinfo already available inside localstorage we just parse that if we dont have then set it to null.
const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
};

const authSlice = createSlice({
  name: "login",
  initialState,
  reducers : {
    setCredentials : (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload))
      const expirationTime = new Date().getTime() + 30 *24* 60*60*1000;

      localStorage.setItem('expirationTime', expirationTime);

    },
    logout: (state)=> {
      state.userInfo = null;
      localStorage.clear()

    }
  }
});

//by exporting the actions of reducers we can directly use in react components
export const {setCredentials, logout} = authSlice.actions;

//gets access to reducer
export default authSlice.reducer;
import { createSlice, PayloadAction } from "@reduxjs/toolkit"


const getCookie = (): string | null => {

  const cookie = document.cookie.split(";").find((row) => row.trim().startsWith("session_id="));
  return cookie ? cookie.split("=")[1] : null; 
  
};


interface CookieState {
    cookie: string | null; 
  }
  
  // Начальное состояние
  const initialState: CookieState = {
    cookie: getCookie(),
  };

const cookieSlice = createSlice (
  {

    name: "cookie",
    initialState, 
    reducers: {

      setCookie : (state, action : PayloadAction<string> ) => {
        state.cookie = action.payload;
      },

      delCookie : (state) => {
        state.cookie = null;
      }

    }

  }
)

export const {setCookie, delCookie} = cookieSlice.actions;
export default cookieSlice.reducer;
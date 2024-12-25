import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { userLogin, userLoginType } from "../asyncfunc/allasyncfunc"

interface CookieState {
    cookie: { [key: string]: string } | null;
    username: string | null
    loading: boolean;
    error: string | null;
}

const initialState: CookieState = {
    cookie: null,
    username: null,
    loading: false,
    error: null,
};

const cookieSlice = createSlice (
    {
        name: "cookieSlice",
        initialState, 
        reducers: {
            
            setCookieSlice(state, action: PayloadAction<{ [key: string]: string }>) {
                state.cookie = action.payload;
            },

            setUsernameSlice(state, action: PayloadAction<string>) {
                state.username = action.payload
            },

            delAllCookie(state) {
                state.cookie = null
                state.username = null
            }

        },
        extraReducers: (builder) => {
            builder
              .addCase(userLogin.pending, (state) => {
                state.loading = true; 
                state.error = null;  
              })
              .addCase(userLogin.fulfilled, (state, action: PayloadAction<userLoginType>) => {
                state.loading = false; 
                state.username = action.payload.username; 
                state.cookie = {"session_id" : action.payload.session_id}
              })
              .addCase(userLogin.rejected, (state, action) => {
                state.loading = false; 
                state.error = action.payload?.message || "Неизвестная ошибка"; 
              });
          }

    
    }
)

export const {setCookieSlice, setUsernameSlice, delAllCookie} = cookieSlice.actions;
export default cookieSlice.reducer;
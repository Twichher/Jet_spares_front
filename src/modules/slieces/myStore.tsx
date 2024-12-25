import { configureStore } from "@reduxjs/toolkit";
import cookieReducer from "./cookieSlice"
import filterReducer from "./filterSlice"
import orderReducer from "./orderSlice"


export const myStore = configureStore({
    reducer: {
      filter: filterReducer, 
      cookie: cookieReducer,
      order: orderReducer,
    },
});

export type RootState = ReturnType<typeof myStore.getState>; 
export type AppDispatch = typeof myStore.dispatch; 

export default myStore;
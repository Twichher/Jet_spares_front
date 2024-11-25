import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./filterSlice"; 
import cookieReducer from "./cookieSlice"
import OrderReducer from "./orderSlice";
import cartReducer from "./itemSlice";

export const world_spares = configureStore({
  reducer: {
    filter: filterReducer, 
    cookie: cookieReducer,
    order: OrderReducer,
    item: cartReducer
  },
});

export type RootState = ReturnType<typeof world_spares.getState>; 
export type AppDispatch = typeof world_spares.dispatch; 

export default world_spares;

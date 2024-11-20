import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./filterSlice"; 

export const world_spares = configureStore({
  reducer: {
    filter: filterReducer, 
  },
});

export type RootState = ReturnType<typeof world_spares.getState>; 
export type AppDispatch = typeof world_spares.dispatch; 

export default world_spares;

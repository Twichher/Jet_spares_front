import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartState {
  addedItems: { [key: number]: boolean }; 
}

const initialState: CartState = {
  addedItems: {}, 
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<number>) {
      state.addedItems[action.payload] = true; 
    },
    removeItem(state, action: PayloadAction<number>) {
      delete state.addedItems[action.payload]; 
    },
  },
});

export const { addItem, removeItem } = cartSlice.actions;

export default cartSlice.reducer;

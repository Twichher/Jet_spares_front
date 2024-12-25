import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface filterState {
    price_by : string;
    price_up : string;
}

const myInitialState : filterState = {
    price_by :'',
    price_up : ''
}

const filterSlice = createSlice(
    {
        name: 'filter',
        initialState: myInitialState,
        reducers: {

            setPriceBy : ( state, action : PayloadAction<string>) => {
                state.price_by = action.payload;
              },

            setPriceUp : (state, action : PayloadAction<string>) => {
                state.price_up = action.payload
            },

            delFilter : (state) => {
                state.price_by = ''
                state.price_up = ''
            }

        }
    }
);

export const { setPriceBy, setPriceUp, delFilter } = filterSlice.actions;
export default filterSlice.reducer;
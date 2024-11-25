import { createSlice, PayloadAction } from "@reduxjs/toolkit"


interface MySpareState {
    countOrder : number
    idOrder : number
}

const initialState : MySpareState = {
    countOrder: 0,
    idOrder: 0
}

const OrderSlice = createSlice({

    name: "order",
    initialState,
    reducers: {

        setIdOrder (state, action : PayloadAction<number>) {
            state.idOrder = action.payload
        },

        setCount(state, action: PayloadAction<number>) {
            state.countOrder = action.payload
        },
        addSpare (state) {
            state.countOrder += 1
        },
        delSpare(state) {
            state.countOrder -= 1
        },
        removeOrder(state){
            state.countOrder = 0
        }
    }

})

export const { setCount, addSpare, delSpare, removeOrder, setIdOrder } = OrderSlice.actions;

export default OrderSlice.reducer;
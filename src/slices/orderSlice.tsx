import { createSlice, PayloadAction } from "@reduxjs/toolkit"


interface MySpareState {
    countOrder : number
    idOrder : number 
    spares: { [id_spare: number]: number }
}

const initialState : MySpareState = {
    countOrder: 0,
    idOrder: 0,
    spares: {}
}

const OrderSlice = createSlice({

    name: "order",
    initialState,
    reducers: {

        setSpares (state, action : PayloadAction<{id_spare : number; count : number}>) {
            const {id_spare, count} = action.payload
            state.spares[id_spare] = count
        },

        addSpares (state, action : PayloadAction<number>){
            const id_spare = action.payload
            state.spares[id_spare] += 1
        },

        decSpares (state, action: PayloadAction<number>) {
            const id_spare = action.payload
            if (state.spares[id_spare] > 1) {
                state.spares[id_spare] -= 1
            }else {
                console.log("forbiden")
            }
        },

        removeSpares (state, action: PayloadAction<number>){
            const id_spare = action.payload
            delete state.spares[id_spare] 
        },

        clearSpares (state){
            state.spares = {}
        },


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
            state.idOrder = 0
        }
    }

})

export const { setCount, addSpare, delSpare, removeOrder, setIdOrder, setSpares, addSpares, decSpares,  removeSpares, clearSpares} = OrderSlice.actions;

export default OrderSlice.reducer;
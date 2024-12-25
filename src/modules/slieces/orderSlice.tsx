import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { delNewOrder, delSpareFromNewOrder, getOrderInfo, getOrderInfoType, setFormByCreater, setNewCountOfSpare, setOrderInfo } from "../asyncfunc/allasyncfunc";
import { JetOrderInfo } from "../api/Api";

  
  
  interface CartState {
    loading: boolean | null;
    error : string | null;
    data: getOrderInfoType | null;
    id_order: number | null
  }
  
  const initialState: CartState = {
    loading: null,
    error: null,
    data: null,
    id_order: null
  };


  const orderSlice = createSlice(

    {
        name: "order",
        initialState,
        reducers: {
          
          setNewSpareCount(
            state,
            action: PayloadAction<{ id_spare: number; count: number }>
          ) {
            if (state.data) {
              const { id_spare, count } = action.payload;
          
              const spareIndex = state.data.spares.findIndex(
                (item) => item.spare.id_spare === id_spare
              );
          
              if (spareIndex !== -1) {
                state.data.spares[spareIndex].count = count;

                try {
            
                  setNewCountOfSpare(
                      {opk : String(state.id_order), spk : String(id_spare), count : {count : String(count)}}
                  )
                  (
                  () => {}, 
                  () => {}, 
                  null
                  );
      
                } catch (error) {
                    console.error("Ошибка при выполнении запроса:", error);
                }  

              }
            }
          },

          delSpareFromOrder (            
            state,
            action: PayloadAction<{ id_spare: number}>) {
              
              if (state.data) {

                const spareIndex = state.data.spares.findIndex(
                  (item) => item.spare.id_spare === action.payload.id_spare
                );

                if (spareIndex != -1) {

                  state.data.spares.splice(spareIndex, 1);

                  try {
              
                    delSpareFromNewOrder(
                        {opk : String(state.id_order), spk : String(action.payload.id_spare)}
                    )
                    (
                    () => {}, 
                    () => {}, 
                    null
                    );
        
                  } catch (error) {
                      console.error("Ошибка при выполнении запроса:", error);
                  }  

                }
              }

            }, 

            formOrderByCreater (
              state,
              action: PayloadAction<{ id_order: number}>
            ) {

              if (state.data) {

                try {
              
                  setFormByCreater(
                      {id : String(action.payload.id_order)}
                  )
                  (
                  () => {}, 
                  () => {}, 
                  null
                  );
      
                } catch (error) {
                    console.error("Ошибка при выполнении запроса:", error);
                }  

              }

            },

            delOrderByCreater (
              state,
              action: PayloadAction<{ id_order: number}>
            ) {

              if (state.data) {

                try {
              
                  delNewOrder(
                      {id : String(action.payload.id_order)}
                  )
                  (
                  () => {}, 
                  () => {}, 
                  null
                  );
      
                } catch (error) {
                    console.error("Ошибка при выполнении запроса:", error);
                }  

              }

            },

            clearOrderInfo(state) {
              state.data = null
              state.id_order = null
              state.error = null
              state.loading = null
            }

        },
        
        extraReducers: (builder) => {
            builder
              .addCase(getOrderInfo.pending, (state) => {
                state.loading = true; 
                state.error = null;  
              })
              .addCase(getOrderInfo.fulfilled, (state, action: PayloadAction<getOrderInfoType>) => {
                state.loading = false; 
                state.data = action.payload; 
                state.id_order = action.payload.data.id_order
              })
              .addCase(getOrderInfo.rejected, (state, action) => {
                state.loading = false; 
                state.error = action.payload?.message || "Неизвестная ошибка"; 
              })
              .addCase(setOrderInfo.pending, (state) => {
                state.loading = true; 
                state.error = null;  
              })
              .addCase(setOrderInfo.fulfilled, (state, action: PayloadAction<JetOrderInfo>) => {
                state.loading = false; 
                if (state.data){
                  state.data.data.pick_up_point = action.payload.pick_up_point; 
                } else {
                  console.log("Ошибка присовения адреса доставки")
                }
              })  
              .addCase(setOrderInfo.rejected, (state, action) => {
                state.loading = false; 
                state.error = action.payload?.message || "Неизвестная ошибка"; 
              })

          }
    }

)

export const { setNewSpareCount, delSpareFromOrder, formOrderByCreater, clearOrderInfo, delOrderByCreater } = orderSlice.actions;
export default orderSlice.reducer;




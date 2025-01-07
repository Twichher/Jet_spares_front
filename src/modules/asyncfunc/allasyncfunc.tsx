import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from "axios";
import { api } from '../api';
import { JetOrderInfo, JetOrderSpareCount, UserLogin, UserPrivate, UserReg } from '../api/Api';

///////////// Все возможные типы данных для моих фанк функций

export interface ApiError {
    message : string;
} 
// тип ошибки

export interface Spare {
    id_spare : number;
    name_spare : string;
    description_spare : string;
    status_spare : number;
    url_spare : string;
    price_spare : number;
}
// тип одной запчасти

export interface SpareResponse {
    "Jet Order": number | null;
    "Count in Order": number;
    Spares: Spare[];
}
//то что вернет функция

export interface GetSparesByPriceParams {
    price_by?: number;
    price_up?: number;
}

export interface GetSparesByIdParams {
    id_spare: string;
}

export interface ToOrderByIdSpareParams {
    id: string;
}

export interface userLoginType {
    username: string;
    session_id: string;
}

export interface getOrderListOfUserType {
    id_order : number;       
    status_order : number;
    d_start : string; 
    d_form : string;       
    d_compl : string;    
    creater  : number;   
    adminer : number;    
    price_order : number;
    pick_up_point : string;
}

export interface ListOfOrders {
    data : getOrderListOfUserType[]
}

export interface ListOfOrdersParams {
    find_d_form_by: string;
    find_d_form_up: string;
    find_status: string;
}

export interface setOrderInfoType {
    id: string;
    data: JetOrderInfo;
}

export interface delNewOrderType {
    id: string;
}

export interface setFormByCreater {
    id: string;
}

export interface getOrderById {
    id: string;
}

export interface SpareAndCountType {
    spare: Spare;
    count : number;
}

export interface getOrderInfoType{
    data: getOrderListOfUserType;
    count_in_order: number;
    spares: SpareAndCountType[];
}

export interface delSpareFromNewOrderType{
    opk: string;
    spk: string;
}

export interface setNewCountOfSpareType {
    opk: string;
    spk: string;
    count: JetOrderSpareCount;
}
// то что наш фанк может принять как параметры запроса


/////// Сами фанк функции

/// фнукции запчастей 

export const getSparesByPrice = createAsyncThunk<
  SpareResponse, // Тип возвращаемого значения
  { price_by?: number; price_up?: number }, // Тип входных параметров
  { rejectValue: ApiError } // Тип ошибки
>(
  "spares/getSparesByPrice",
  async ({ price_by, price_up }, { rejectWithValue }) => {
    try {
      const params: Record<string, any> = {};
      if (price_by !== undefined) params.price_by = price_by;
      if (price_up !== undefined) params.price_up = price_up;

      const response = (await api.spares.sparesListList(params)) as unknown as AxiosResponse<SpareResponse>;

      if (response.data && "Spares" in response.data) {
        const spares = response.data.Spares;

        if (price_by === undefined && price_up === undefined) {
            return response.data;
        }

        if (price_by === 0 && price_up === 0) {
            return response.data;
        }

        const filteredSpares = spares.filter((spare) => {
          return (
            (price_by === undefined || spare.price_spare >= price_by) &&
            (price_up === undefined || spare.price_spare <= price_up)
          );
        });

        const sortedSpares = [...filteredSpares].sort((a, b) => {
          if (a.price_spare === undefined || b.price_spare === undefined) return 0;

          if (price_by !== undefined && price_up === undefined) {
            return a.price_spare - b.price_spare; 
          } else if (price_up !== undefined && price_by === undefined) {
            return b.price_spare - a.price_spare; 
          } else {
            return a.price_spare - b.price_spare; 
          }
        });

        return {
          ...response.data,
          Spares: sortedSpares,
        } as SpareResponse;
      } else {
        throw new Error("Некорректные данные от сервера");
      }
    } catch (error: any) {
      return rejectWithValue({
        message: error.response?.data?.message || error.message || "Ошибка получения данных",
      });
    }
  }
);





export const getSpareById = createAsyncThunk<
    Spare,
    GetSparesByIdParams,
    { rejectValue: ApiError }
>(
    "spares/getSparesById",
    async ({ id_spare }, { rejectWithValue }) => {
        try {
            const response = (await api.spares.sparesInfoList(
                id_spare,
            )) as unknown as AxiosResponse<Spare>;

            return response.data
        
        } catch (error : any) {
            return rejectWithValue({
                message: error.response?.data?.message || error.message || "Ошибка получения данных",
            });
        }
    }
)

export const toOrderByIdSpare = createAsyncThunk<
    any,
    ToOrderByIdSpareParams,
    { rejectValue: ApiError }
>(
    "spares/toOrder",
    async ({ id }, { rejectWithValue }) => {
        try {
            const response = (await api.spares.sparesToOrderCreate(
                id,
            ))

            return response
        
        } catch (error : any) {
            return rejectWithValue({
                message: error.response?.data?.message || error.message || "Ошибка получения данных",
            });
        }
    }
)


/// функции для пользователя

export const userLogin = createAsyncThunk<
    userLoginType,
    UserLogin,
    { rejectValue: ApiError }
>(
    "user/login",
    async ({ username, password }, { rejectWithValue }) => {
        try {
            const response = (await api.user.userLoginCreate(
                {username, password}
            )) as unknown as AxiosResponse<userLoginType>

            return response.data
        
        } catch (error : any) {
            return rejectWithValue({
                message: error.response?.data?.message || error.message || "Ошибка получения данных",
            });
        }
    }
)

export const userLogout = createAsyncThunk<
    any,
    any,
    { rejectValue: ApiError }
>(
    "user/logout",
    async ({ rejectWithValue }) => {
        try {
            const response = (await api.user.userLogoutCreate())

            return response
        
        } catch (error : any) {
            return rejectWithValue({
                message: error.response?.data?.message || error.message || "Ошибка получения данных",
            });
        }
    }
)


export const userPrivate = createAsyncThunk<
    UserPrivate,
    UserPrivate,
    { rejectValue: ApiError }
>(
    "user/private",
    async (userData, { rejectWithValue }) => {
      try {
        const response: AxiosResponse<UserPrivate> = await api.user.userPrivateUpdate(userData);
  
        return response.data;
      } catch (error: any) {
        return rejectWithValue({
          message: error.response?.data?.message || error.message || "Ошибка получения данных",
        });
      }
    }
)

export const userRegistration = createAsyncThunk<
    UserReg,
    UserReg,
    { rejectValue: ApiError }
>(
    "user/registration",
    async (UserReg, { rejectWithValue }) => {
      try {
        const response: AxiosResponse<UserReg> = await api.user.userRegisterCreate(UserReg);
  
        return response.data;
      } catch (error: any) {
        return rejectWithValue({
          message: error.response?.data?.message || error.message || "Ошибка получения данных",
        });
      }
    }
)

//// фанки для заказов (orders)

export const getOrderListOfUser = createAsyncThunk<
  ListOfOrders,
  { statusFilter?: number; startDateFilter?: string; byDateFilter?: string },
  { rejectValue: ApiError }
>(
  "orders/getListOrders",
  async ({ statusFilter, startDateFilter, byDateFilter }, { rejectWithValue }) => {
    try {

      const response = await api.orders.ordersListList({
        find_status: statusFilter,
        find_d_form_by: startDateFilter,
        find_d_form_up: byDateFilter,
      }) as unknown as AxiosResponse<getOrderListOfUserType[]>;

      const sortedData: ListOfOrders = {
        data: response.data.sort((a, b) => a.id_order - b.id_order),
      };

      return sortedData;
    } catch (error: any) {
      return rejectWithValue({
        message: error.response?.data?.message || error.message || "Ошибка получения данных",
      });
    }
  }
);




export const setOrderInfo = createAsyncThunk<
    JetOrderInfo,
    setOrderInfoType,
    { rejectValue: ApiError }
>(
    "orders/setInfo",
    async ({id, data}, { rejectWithValue }) => {
      try {

        const response = await api.orders.ordersAddInfoUpdate(
            id, data
        ) as unknown as AxiosResponse<JetOrderInfo>;

        return response.data;
      } catch (error: any) {
        return rejectWithValue({
          message: error.response?.data?.message || error.message || "Ошибка получения данных",
        });
      }
    }
)

export const delNewOrder = createAsyncThunk<
    any,
    delNewOrderType,
    { rejectValue: ApiError }
>(
    "orders/delNewOrder",
    async ({id}, { rejectWithValue }) => {
        try {
            const response = (await api.orders.ordersDeleteDelete(id))

            return response
        
        } catch (error : any) {
            return rejectWithValue({
                message: error.response?.data?.message || error.message || "Ошибка получения данных",
            });
        }
    }
)


export const setFormByCreater = createAsyncThunk<
    any,
    setFormByCreater,
    { rejectValue: ApiError }
>(
    "orders/formByCreater",
    async ({id}, { rejectWithValue }) => {
        try {
            const response = (await api.orders.ordersFormByCreaterUpdate(id))

            return response
        
        } catch (error : any) {
            return rejectWithValue({
                message: error.response?.data?.message || error.message || "Ошибка получения данных",
            });
        }
    }
)

export const getOrderInfo = createAsyncThunk<
    getOrderInfoType,
    getOrderById,
    { rejectValue: ApiError }
>(
    "orders/getInfoOfOrder",
    async ({id}, { rejectWithValue }) => {
      try {

        const response = await api.orders.ordersInfoList(id) as unknown as AxiosResponse<getOrderInfoType>;

        const sortedData = {
          ...response.data,
          spares: response.data.spares.sort((a, b) => a.spare.id_spare - b.spare.id_spare),
        };
  
        return sortedData;


        // const response = await api.orders.ordersInfoList(
        //     id
        // ) as unknown as AxiosResponse<getOrderInfoType>;

        // return response.data;
      } catch (error: any) {
        return rejectWithValue({
          message: error.response?.data?.message || error.message || "Ошибка получения данных",
        });
      }
    }
)

// фанки для м-м заказов запчастей

export const delSpareFromNewOrder = createAsyncThunk<
    any,
    delSpareFromNewOrderType,
    { rejectValue: ApiError }
>(
    "orderspare/deleteFromOrder",
    async ({opk, spk}, { rejectWithValue }) => {
        try {
            const response = await api.orderspare.orderspareDeleteDelete(
                opk, spk
            )

            return response
        
        } catch (error : any) {
            return rejectWithValue({
                message: error.response?.data?.message || error.message || "Ошибка получения данных",
            });
        }
    }
)

export const setNewCountOfSpare = createAsyncThunk<
    any,
    setNewCountOfSpareType,
    { rejectValue: ApiError }
>(
    "orderspare/newCountOfSpare",
    async ({opk, spk, count}, { rejectWithValue }) => {
        try {
            const response = await api.orderspare.orderspareNewCountUpdate(
                opk, spk, count
            )

            return response.data
        
        } catch (error : any) {
            return rejectWithValue({
                message: error.response?.data?.message || error.message || "Ошибка получения данных",
            });
        }
    }
)
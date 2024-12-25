import { getOrderInfo, getOrderListOfUser, getOrderListOfUserType } from "../../modules/asyncfunc/allasyncfunc";
import { ROUTE_LABELS, ROUTES } from "../../modules/myroutes/MyRoutes";
import { BreadCrumbs } from "../BreadCrumbs/BreadCrumbs";
import { MyHeader } from "../MyHeader/MyHeader";
import { RootState, AppDispatch} from "../../modules/slieces/myStore"
import "./OrdersList.css"
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export const OrdersList = () => {

    const username = useSelector((state: RootState) => state.cookie.username);
    const [allOrders, SetAllOrders] = useState<getOrderListOfUserType[] | null>(null)
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const getOrdersInfo = async () => {

        try {

            const allOrders = await getOrderListOfUser({})
            (
            () => {}, 
            () => {}, 
            null
            );
            if (allOrders.payload && "data" in allOrders.payload) SetAllOrders(allOrders.payload.data )

        } catch {

            console.log("Error!")

        }

    }

    const getInfoOfOrder = async (id_order : number) => {

        dispatch(getOrderInfo({id: String(id_order)}));
        navigate(`${ROUTES.ORDER}/${id_order}`)

    }


    useEffect( () => {

        getOrdersInfo()

      }, [] )


    return (

        <>

        <MyHeader />

        <div className="MP_breadcrumbs">
                <BreadCrumbs
                crumbs={[
                    { label: ROUTE_LABELS.SPARES, path: ROUTES.SPARES },
                    { label: `${username}` || "Пользователь", path: `${ROUTES.USER}/${username}` },
                    { label: "Заказы" },
                ]}
                />
        </div>

        <div className="AllOrder">
        <h2>Заказы покупателя</h2>
        {allOrders ? (
            allOrders.map((order) => (
            <div key={order.id_order} className="OrderCard">
                <div className="info">
                <p><strong>Номер:</strong> {order.id_order}</p>
                <p><strong>Статус:</strong> {order.status_order === 1 ? "В процессе" : "Завершён"}</p>
                <p><strong>Адрес:</strong> {order.pick_up_point}</p>
                </div>
                <button onClick={() => getInfoOfOrder(order.id_order)}>Просмотр</button>
            </div>
            ))
        ) : (
            <p>Загрузка заказов...</p>
        )}
        </div>
        
        </>

    )

}
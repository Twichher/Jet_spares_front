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

    const [statusFilter, setStatusFilter] = useState(""); 
    const [startDateFilter, setStartDateFilter] = useState("");
    const [byDateFilter, setByDateFilter] = useState("");

    const handleStatusFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStatusFilter(e.target.value);
      };
    
      const handleStartDateFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStartDateFilter(e.target.value);
      };
    
      const handleByDateFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setByDateFilter(e.target.value);
      };
    

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

            console.log(allOrders.payload)
            if (allOrders.payload && "data" in allOrders.payload) {
                let filteredOrders = allOrders.payload.data;
          
                if (statusFilter !== "") {
                  filteredOrders = filteredOrders.filter(
                    (order) => order.status_order === parseInt(statusFilter)
                  );
                }
          

                if (startDateFilter !== "" && byDateFilter !== "") {
                  filteredOrders = filteredOrders.filter(
                    (order) =>
                      new Date(startDateFilter) <= new Date(order.d_start) &&
                      new Date(order.d_start) <= new Date(byDateFilter)
                  );
                } else if (startDateFilter !== "") {

                  filteredOrders = filteredOrders.filter(
                    (order) => new Date(startDateFilter) <= new Date(order.d_start)
                  );
                } else if (byDateFilter !== "") {

                  filteredOrders = filteredOrders.filter(
                    (order) => new Date(order.d_start) <= new Date(byDateFilter)
                  );
                }
          

                SetAllOrders(filteredOrders);
            }


        } catch {

            console.log("Error!")

        }

    }

    const getInfoOfOrder = async (id_order : number) => {

        dispatch(getOrderInfo({id: String(id_order)}));
        navigate(`${ROUTES.ORDER}/${id_order}`)

    }

    const SortOrders = async () => {

        getOrdersInfo()

        // console.log(statusFilter)
        // console.log(startDateFilter)
        // console.log(byDateFilter)

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

        <div className="filters">
          <div className="filter">
            <label htmlFor="statusFilter">Сортировка по статусу:</label>
            <input
              id="statusFilter"
              type="text"
              placeholder="Введите статус"
              value={statusFilter}
              onChange={handleStatusFilterChange}
            />
          </div>
          <div className="filter">
            <label htmlFor="startDateFilter">Дата создания от:</label>
            <input
              id="startDateFilter"
              type="date"
              value={startDateFilter}
              onChange={handleStartDateFilterChange}
            />
          </div>
          <div className="filter">
            <label htmlFor="formDateFilter">Дата создания до:</label>
            <input
              id="formDateFilter"
              type="date"
              value={byDateFilter}
              onChange={handleByDateFilterChange}
            />
          </div>

          <button onClick={() => {SortOrders()}}> Сортировать </button>      

        </div>

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
import { useState } from "react";
import { AppDispatch, RootState } from "../../modules/slieces/myStore";
import { MyHeader } from "../MyHeader/MyHeader";
import "./OrderPage.css"
import { useDispatch, useSelector } from "react-redux";
import { BreadCrumbs } from "../BreadCrumbs/BreadCrumbs";
import { ROUTE_LABELS, ROUTES } from "../../modules/myroutes/MyRoutes";
import { setOrderInfo } from "../../modules/asyncfunc/allasyncfunc";
import { delOrderByCreater, delSpareFromOrder, formOrderByCreater, setNewSpareCount } from "../../modules/slieces/orderSlice";
import { useNavigate } from "react-router-dom";


export const OrderPage = () => {

    const data = useSelector((state: RootState) => state.order.data);
    const id_order = useSelector((state: RootState) => state.order.id_order);
    const username = useSelector((state: RootState) => state.cookie.username);

    const current_pickuppoint = data
        ? useSelector((state: RootState) => state.order.data?.data.pick_up_point)
        : "";

    const [pickuppoint, setpickuppoint] = useState(current_pickuppoint)
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const formatDate = (dateString: string | undefined): string | null => {
        if (!dateString) return null;
        return dateString.split("T")[0];
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setpickuppoint(event.target.value); 
    };

    const SavePickUpPoint = async () => {

        dispatch(setOrderInfo({ id: String(id_order), data: {pick_up_point : pickuppoint || ""} }))

    }

    const formOrderHandler = async () => {

        if (data) {
            try{
                dispatch(formOrderByCreater({id_order: data.data.id_order}))
                navigate(`${ROUTES.SPARES}`);
            } catch {
                console.log("error !!!")
            }
        }

    }

    const delOrderHandler = async () => {

        if (data) {
            try{
                dispatch(delOrderByCreater({id_order: data.data.id_order}))
                navigate(`${ROUTES.SPARES}`);
            } catch {
                console.log("error !!!")
            }
        }

    }

    const decItemCount = async (id_spare : number, count : number) => {

        if (count - 1 > 0) dispatch(setNewSpareCount({id_spare : id_spare, count : count - 1}))

    }

    const incItemCount = async (id_spare : number, count : number) => {

        dispatch(setNewSpareCount({id_spare : id_spare, count : count + 1}))
        
    }

    const delSpareFormOrder = async (id_spare : number) => {

        dispatch(delSpareFromOrder({id_spare : id_spare}))

    }


    return (

        <>
            <MyHeader />

            <div className="MP_breadcrumbs">
                <BreadCrumbs
                crumbs={[
                    { label: ROUTE_LABELS.SPARES, path: ROUTES.SPARES },
                    { label: `${username}` || "Пользователь", path: `${ROUTES.USER}/${username}` },
                    { label: `Заказ ${String(id_order)}` || "Заказ" },
                ]}
                />
            </div>

            <div className="orderInfoSpare">
                <div className="orderInfo">
                    <h1 className="orderHeader">
                    Заказ №{data?.data.id_order}
                    <span className="underline"></span>
                    </h1>
                    <div className="orderDetails">
                        <h2>Покупатель: {data?.data.creater}</h2>
                        <h2>Дата создания заказа: {formatDate(data?.data.d_start)}</h2>
                        {data?.data.status_order != 0 && (
                                    <h2>
                                        Статус заказа:{" "}
                                        {data?.data.status_order === 2
                                        ? "Сформирован"
                                        : data?.data.status_order === 3
                                        ? "Завершен"
                                        : data?.data.status_order === 4
                                        ? "Отклонен"
                                        : "Неизвестный статус"}
                                    </h2>
                                    )}
                        {data?.data.d_form && <h2>Дата формирования заказа: {formatDate(data.data.d_form)}</h2>}
                        {data?.data.d_compl  && <h2>Дата завршения заказа: {formatDate(data.data.d_compl)}</h2>}
                        {data?.data.price_order != 0 && <h2>Цена заказа: {data?.data.price_order}</h2>}
                        <div className="addressInput">
                            <label htmlFor="pickuppoint">Адрес доставки:</label>
                            
                            {data?.data.status_order == 0 &&
                                <>
                                    <input
                                        type="text"
                                        id="pickuppoint"
                                        name="pickuppoint"
                                        value={pickuppoint}
                                        onChange={handleChange}
                                        required
                                        placeholder="Введите адрес доставки"
                                    />

                                    <button onClick={SavePickUpPoint} > Сохранить адрес доставки  </button>
                                </>
                            }

                            {data?.data.pick_up_point && data?.data.status_order != 0 &&
                                <h2 id="adressReady">{data?.data.pick_up_point}</h2>
                            }
                            
                        </div>

                        {data?.data.status_order == 0  &&
                            <>
                                <button onClick={formOrderHandler}> Сформировать заказ! </button>
                                <button onClick={delOrderHandler}> Удалить заказ! </button>
                            </>
            
                        }

                    </div>
                </div>

                <div className="orderSpares">
                    <h2>Запчасти в заказе</h2>
                    {data && data.spares.length > 0 ? (
                    <table className="sparesTable">
                        <thead>
                        <tr>
                            <th>Картинка</th>
                            <th>Название</th>
                            <th>Количество</th>
                            <th>Цена шт.</th>
                            {data?.data.status_order == 0 && <th></th>}
                        </tr>
                        </thead>
                        <tbody>
                        {data.spares.map((spare) => (
                            <tr key={spare.spare.id_spare}>
                            <td>
                                <img
                                src={spare.spare.url_spare || "no_img_spare.jpg"}
                                alt={spare.spare.name_spare}
                                style={{ width: "80px", height: "80px" }}
                                />
                            </td>
                            <td>{spare.spare.name_spare}</td>

                            <td>
                                {data?.data.status_order == 0 && <button onClick={() => decItemCount(spare.spare.id_spare, spare.count)}>-</button>}
                                {spare.count}
                                {data?.data.status_order == 0 && <button onClick={() => incItemCount(spare.spare.id_spare, spare.count)}>+</button>}
                            </td>

                            <td>{spare.spare.price_spare} ₽</td>
                            {data?.data.status_order == 0 && <td><button id="delButton" onClick={() => delSpareFormOrder(spare.spare.id_spare)}>Удалить</button></td>}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    ) : (
                    <p>Нет товаров в заказе</p>
                    )}
                </div>

            </div>
            
        </>

    )
}
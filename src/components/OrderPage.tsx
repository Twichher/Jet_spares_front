import { FC, useEffect, useState } from "react"
import { api } from "../api"
import { useNavigate, useParams } from "react-router-dom"
import { MySpares } from "../modules/MyInterface"
import { MyOwnHeader } from "./MyOwnHeader"
import "./OrderPage.css"
import { ROUTES } from "../modules/MyRoutes"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../slices/sparesRed"
import { addSpare, addSpares, clearSpares, decSpares, removeSpares, setSpares } from "../slices/orderSlice"
import { clearItems, removeItem } from "../slices/itemSlice"


export interface OrderI {
    adminer: string
    creater: string
    d_start: string
    d_compl: string
    d_form: string
    id_order: number
    pick_up_point: string | null
    price_order: number
    status_order: number
}


export const OrderPage : FC = () => {

    const {id_order} = useParams()

    const dispatch = useDispatch();
    const [spares, setDataSpares] = useState<MySpares[] | null>()
    const [order, setOrder] = useState<OrderI | null>()
    const [pickuppoint, setPick] = useState<string>("");
    const [statusOrder, setStatusOrder] = useState<number | null>()
    const countspares = useSelector((state: RootState) => state.order.spares)
    const id_user_r = useSelector((state: RootState) => state.cookie.id_user)
    // const idOrder = useSelector((state: RootState) => state.order.idOrder);
    const navigate = useNavigate();

    const getSparesOrder = async () => {
        const {data} = await api.orders.ordersInfoList(String(id_order))

        return (data)
    }

    const formatDate = (dateString: string | undefined): string | null => {
        if (!dateString) return null;
        return dateString.split("T")[0]; // Берём часть до символа "T"
      };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPick(event.target.value); // Устанавливаем значение из события

      };

    const formOrderHandler = () => {

        if (pickuppoint != ""){
            api.orders.ordersAddInfoUpdate(String(id_order), {pick_up_point : pickuppoint})
                .then (() => {

                    // api.orderspare.orderspareNewCountUpdate()

                    api.orders.ordersFormByCreaterUpdate(String(id_order))
                    .then(() => {
                        dispatch(clearSpares())
                        dispatch(clearItems())
                        navigate(ROUTES.SPARES)})
                    
                })
                .catch((err) => console.log(err))


        } else {
            console.log("Есть пустые поля")
        }



     }

     const incItemCount = (id_spare : number) => {
        // api.orderspare.orderspareNewCountUpdate(String(id_order), String(id_spare), 10)
        dispatch(addSpares(id_spare))
        api.orderspare.orderspareNewCountUpdate(String(id_order), String(id_spare), {count: countspares[id_spare] + 1});
        // console.log(countspares)
        // console.log(spares.spare.)
        // api.orderspare.orderspareNewCountUpdate(String(id_order), String(id_spare), )
     }

     const decItemCount = (id_spare : number) => {
        dispatch(decSpares(id_spare))
        api.orderspare.orderspareNewCountUpdate(String(id_order), String(id_spare), {count: countspares[id_spare] - 1});
        // console.log(countspares)
     }

     const delSpareFormOrder = (id_spare : number) => {
        api.orderspare.orderspareDeleteDelete(String(id_order), String(id_spare))
            .then(() => {
                dispatch(removeSpares(id_spare))
                dispatch(removeItem(id_spare))
            })
            .catch((err) => console.log(err))
     }


     const delOrderHandler = () => {
        
        api.orders.ordersDeleteDelete(String(id_order))
            .then(() => {
                dispatch(clearSpares())
                dispatch(clearItems())
                navigate(ROUTES.SPARES)})
            .catch((err) => console.log(err));

     }

     const backToPrivate = () => {
            navigate(`${ROUTES.USER}/${id_user_r}`)
     }

    useEffect(() => {
        getSparesOrder()
            .then((data) => { 
                setStatusOrder(Number(data.data.status_order))
                setOrder(data.data)
    
                const sortedSpares = data.spares.sort((a: { spare: { name_spare: string } }, b: { spare: { name_spare: string } }) => {
                    if (a.spare.name_spare < b.spare.name_spare) return -1;
                    if (a.spare.name_spare > b.spare.name_spare) return 1;
                    return 0;
                });

                setDataSpares(sortedSpares);

                data.spares.forEach((item: { spare: { id_spare: number }; count: number }) => {
                    dispatch(setSpares({ id_spare: item.spare.id_spare, count: item.count }));
                  });


            })
            .catch((err) => console.log(err))
    }, [countspares])   


    return (

        <>

        <MyOwnHeader />

                <div className="orderInfoSpare">
        <div className="orderInfo">
            <h1 className="orderHeader">
            Заказ №{order?.id_order}
            <span className="underline"></span>
            </h1>
            <div className="orderDetails">
            <h2>Покупатель: {order?.creater}</h2>
            <h2>Дата создания заказа: {formatDate(order?.d_start)}</h2>
            {order?.d_form && <h2>Дата формирования заказа: {formatDate(order?.d_form)}</h2>}
            {order?.d_compl && <h2>Дата завршения заказа: {formatDate(order?.d_compl)}</h2>}
            {statusOrder !== 0 && (
                                    <h2>
                                        Статус заказа:{" "}
                                        {order?.status_order === 2
                                        ? "Сформирован"
                                        : order?.status_order === 3
                                        ? "Завершен"
                                        : order?.status_order === 4
                                        ? "Отклонен"
                                        : "Неизвестный статус"}
                                    </h2>
                                    )}
            {order?.price_order != 0 && <h2>Цена заказа: {order?.price_order}</h2>}
            <div className="addressInput">
                <label htmlFor="pickuppoint">Адрес доставки:</label>
                
                {statusOrder == 0 &&
                <input
                type="text"
                id="pickuppoint"
                name="pickuppoint"
                value={pickuppoint}
                onChange={handleChange}
                required
                placeholder="Введите адрес доставки"
                />
                }

                {statusOrder != 0 && 
                <h2 id="adressReady">{order?.pick_up_point}</h2>
                }
                
            </div>
            {statusOrder == 0 &&
            <>
                <button onClick={formOrderHandler}> Сформировать заказ! </button>
                <button onClick={delOrderHandler}> Удалить заказ! </button>
            </>
            
            }

            {statusOrder != 0 && 
                <button onClick={backToPrivate}> Назад </button>
            }

        </div>
        </div>

        <div className="orderSpares">
            <h2>Запчасти в заказе</h2>
            {spares && spares.length > 0 ? (
            <table className="sparesTable">
                <thead>
                <tr>
                    <th>Картинка</th>
                    <th>Название</th>
                    <th>Количество</th>
                    <th>Цена шт.</th>
                    {statusOrder == 0 && <th></th>}
                </tr>
                </thead>
                <tbody>
                {spares.map((spare) => (
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
                        {statusOrder == 0 && <button onClick={() => decItemCount(spare.spare.id_spare)}>-</button>}
                        {countspares[spare.spare.id_spare]}
                        {statusOrder == 0 && <button onClick={() => incItemCount(spare.spare.id_spare)}>+</button>}
                    </td>

                    <td>{spare.spare.price_spare} ₽</td>
                    {statusOrder == 0 && <td><button id="delButton" onClick={() => delSpareFormOrder(spare.spare.id_spare)}>Удалить</button></td>}
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
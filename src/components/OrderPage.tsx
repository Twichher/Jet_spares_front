import { FC, useEffect, useState } from "react"
import { api } from "../api"
import { useParams } from "react-router-dom"
import { MySpares } from "../modules/MyInterface"
import { MyOwnHeader } from "./MyOwnHeader"
import "./OrderPage.css"


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


    const [spares, setSpares] = useState<MySpares[] | null>()
    const [order, setOrder] = useState<OrderI | null>()
    const [pickuppoint, setPick] = useState<string>("");

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

        console.log(pickuppoint)
     }

    useEffect(() => {
        getSparesOrder()
            .then((data) => {
                setOrder(data.data)
                setSpares(data.spares)
            })
            .catch((err) => console.log(err))
    }, [])   


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
            {order?.price_order != 0 && <h2>Цена заказа: {order?.price_order}</h2>}
            <div className="addressInput">
                <label htmlFor="pickuppoint">Адрес доставки:</label>
                
                {order?.status_order == 0 &&
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
            </div>
            <button onClick={formOrderHandler}> Сформировать заказ! </button>
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
                    <td>{spare.count || 1}</td>
                    <td>{spare.spare.price_spare} ₽</td>
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
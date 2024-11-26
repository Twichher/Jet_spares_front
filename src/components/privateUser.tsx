import { FC, useEffect, useState } from "react"
import "./privateUser.css"
import { MyOwnHeader } from "./MyOwnHeader"
import { api } from "../api"
import { ROUTES } from "../modules/MyRoutes";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearSpares } from "../slices/orderSlice";
import { clearItems } from "../slices/itemSlice";
import { delCookie } from "../slices/cookieSlice";
import { delFilter } from "../slices/filterSlice";

interface UserInfo {
    id: number;
    password: string;
    last_login: string | null;
    is_superuser: boolean;
    username: string;
    last_name: string;
    email: string;
    is_staff: boolean;
    is_active: boolean;
    date_joined: string;
    first_name: string;
  }


export const PrivateUser: FC = () => {

    const [userInfoPage, setUserInfo] = useState();
    const [userOrderInfo, setUserOrderInfo] = useState()
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const getUser = async () => {

        const data = await api.user.userWhoamiList()

        return data

    }

    const getOrder = async () => {
        const data = await api.orders.ordersListList()

        return data
    }

    const handleOrderView = (id_order : string) => {
        navigate(`${ROUTES.ORDER}/${id_order}`);
    }

    const changeInfoHandler = () => {
        console.log(userInfoPage?.id)
        navigate(`${ROUTES.USERINFO}/${userInfoPage?.id}`)
    }

    const logoutHandler = () => {
        api.user.userLogoutCreate()
            .then(() => {
                dispatch(clearSpares())
                dispatch(clearItems())
                dispatch(delCookie())
                dispatch(delFilter())
                navigate(ROUTES.HOME);
            })
    }



      useEffect(() => {
        getUser()
          .then((data) => {setUserInfo(data.data); // Сохраняем данные в состояние
            console.log(data.data); // Проверяем, что получили данные
          })
          .catch((err) => console.error(err));

        getOrder()
          .then((data) => {setUserOrderInfo(data.data);
                console.log(data.data)
          })
          .catch((err) => console.log(err));
      }, []);

    return ( 

        <>
            <MyOwnHeader/>
            <div className="mainProfileDiv">
                <h1 className="profileTitle">Личный кабинет</h1>
                {userInfoPage ? (
                    <div className="privateInfo">
                        <p><span className="label">Логин:</span> {userInfoPage.username}</p>
                        <p><span className="label">Фамилия:</span> {userInfoPage.last_name}</p>
                        <p><span className="label">Имя:</span> {userInfoPage.first_name}</p>
                        <p><span className="label">Почта:</span> {userInfoPage.email}</p>
                        <p>
                            <span className="label">Дата регистрации:</span>{" "}
                            {new Date(userInfoPage.date_joined).toLocaleDateString()}
                        </p>

                        <button onClick={changeInfoHandler}> Изменить информацию </button>
                        <button onClick={logoutHandler}> Выйти </button>
                    </div>


  ) : (
    <h1>Нет информации о пользователе</h1>
  )}

  <h2 className="ordersTitle">Заказы покупателя</h2>
  {userOrderInfo ? (
    <div className="privateOrders">
      {userOrderInfo.length > 0 ? (
        <table className="ordersTable">
          <thead>
            <tr>
              <th>Номер заказа</th>
              <th>Адрес доставки</th>
              <th>Статус заказа</th>
              <th>Действие</th>
            </tr>
          </thead>
          <tbody>
            {userOrderInfo.map((order: any) => (
              <tr key={order.id_order}>
                <td>{order.id_order}</td>
                <td>{order.pick_up_point || "Адрес не указан"}</td>
                <td>
                  {order.status_order === 2
                    ? "Сформирован"
                    : order.status_order === 3
                    ? "Завершен"
                    : order.status_order === 4
                    ? "Отклонен"
                    : "Неизвестный статус"}
                </td>
                <td>
                  <button
                    onClick={() => handleOrderView(order.id_order)}
                    className="viewOrderButton"
                  >
                    Просмотр
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Нет доступных заказов</p>
      )}
    </div>
  ) : (
    <h1>Нет информации о заказах</h1>
  )}
</div>
        </>
    )

}
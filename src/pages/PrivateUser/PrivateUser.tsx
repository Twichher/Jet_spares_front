import "./PrivateUser.css"
import { BreadCrumbs } from "../BreadCrumbs/BreadCrumbs";
import { MyHeader } from "../MyHeader/MyHeader";
import { ROUTE_LABELS, ROUTES } from "../../modules/myroutes/MyRoutes";
import { RootState, AppDispatch } from "../../modules/slieces/myStore"
import { useDispatch, useSelector } from "react-redux";
import { delAllCookie } from "../../modules/slieces/cookieSlice";
import { useNavigate } from "react-router-dom";


export const PrivateUser = () => {

    const username = useSelector((state: RootState) => state.cookie.username);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();


    const changeInfoHandler = async () => {

        navigate(ROUTES.USERINFO)

    }

    const getOrdersList = async () => {

        navigate(ROUTES.USERORDERS)

    }

    const logoutHandler = async () => {

        dispatch(delAllCookie())
        navigate(`${ROUTES.HOME}`);


    }


    return (

        <>

        <MyHeader/>

        <div className="MP_breadcrumbs">
                <BreadCrumbs
                crumbs={[
                    { label: ROUTE_LABELS.SPARES, path: ROUTES.SPARES },
                    { label: `${username}` || "Пользователь" },
                ]}
                />
        </div>


        <div className="mainProfileDiv">
            <h1 className="profileTitle">Личный кабинет</h1>
            <div className="privateInfo">
                <p><span className="label">Логин:</span> {username}</p>
                <button onClick={changeInfoHandler}> Изменить информацию </button>
                <button onClick={getOrdersList} id="orders"> Просмтор заказов </button>
                <button onClick={logoutHandler}> Выйти </button>
            </div>
        </div>
        
        </>



    )


}
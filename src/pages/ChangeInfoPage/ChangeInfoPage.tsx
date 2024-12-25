import "./ChangeInfoPage.css"
import { BreadCrumbs } from "../BreadCrumbs/BreadCrumbs";
import { MyHeader } from "../MyHeader/MyHeader";
import { ROUTE_LABELS, ROUTES } from "../../modules/myroutes/MyRoutes";
import { RootState, AppDispatch } from "../../modules/slieces/myStore"
import { useDispatch, useSelector } from "react-redux";
import { delAllCookie } from "../../modules/slieces/cookieSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { userPrivate } from "../../modules/asyncfunc/allasyncfunc";
import { UserPrivate } from "../../modules/api/Api";


export const ChangeInfoPage = () => {

    const username = useSelector((state: RootState) => state.cookie.username);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [error, setError] = useState(false)

    const [newUserInfo, setNewInfo] = useState<UserPrivate>({
        username: "",
        password: "",
      });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewInfo((prevData) => ({ ...prevData, [name]: value }));
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const filteredUserInfo = Object.fromEntries(
            Object.entries(newUserInfo).filter(([key, value]) => value.trim() !== "")
        );

        console.log(filteredUserInfo)

        try {


            await userPrivate(
                filteredUserInfo
            )
            (
            () => {}, 
            () => {}, 
            null
            );
            

            dispatch(delAllCookie())
            navigate(ROUTES.HOME)


        } catch (error) {
            console.error("Ошибка при выполнении запроса:", error);
            setError(true)
        } 
        
    }


    return (

        <>
        
        <MyHeader/>

        <div className="MP_breadcrumbs">
                <BreadCrumbs
                crumbs={[
                    { label: ROUTE_LABELS.SPARES, path: ROUTES.SPARES },
                    { label: `${username}` || "Пользователь", path: `${ROUTES.USER}/${username}` },
                    { label: ROUTE_LABELS.USERINFO},
                ]}
                />
        </div>

                <div className="mainNewInfo">

                    <div className="infoSection">
                        <h2 className="subHeader">Новая информация</h2>
                        <form className="updateForm" onSubmit={handleSubmit}>

                            <div className="formGroup">
                                <label htmlFor="username" className="formLabel">Новый логин:</label>
                                <input
                                type="text"
                                id="username"
                                name="username"
                                value={newUserInfo.username}
                                onChange={handleChange}
                                className="formInput"
                                />
                            </div>

                            <div className="formGroup">
                                <label htmlFor="password" className="formLabel">Новый пароль:</label>
                                <input
                                type="password"
                                id="password"
                                name="password"
                                value={newUserInfo.password}
                                onChange={handleChange}
                                className="formInput"
                                />
                            </div>



                            <div className="twoButton">
                                <button type="submit" className="submitButton">Применить изменения</button>
                                { error && <h2>Ошибка!</h2> }
                            </div>


                            <p className="note">*При изменении информации вы выйдете из аккаунта</p>
                        </form>
                    </div>

                </div>

        </>

    )


}
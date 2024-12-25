import { MyHeader } from "../MyHeader/MyHeader"
import "./LoginPage.css"
import { RootState, AppDispatch } from "../../modules/slieces/myStore"
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { userLogin } from "../../modules/asyncfunc/allasyncfunc";
import { ROUTE_LABELS, ROUTES } from "../../modules/myroutes/MyRoutes";
import { BreadCrumbs } from "../BreadCrumbs/BreadCrumbs";
import { useNavigate } from "react-router-dom";



export const LoginPage = () => {

    const dispatch = useDispatch<AppDispatch>();
    const { loading, error } = useSelector(
        (state: RootState) => state.cookie
    );

    const [userName, setUsername] = useState("")
    const [userPassword, setPassword] = useState("")

    const navigate = useNavigate();


    const handleSubmit = async (e: React.FormEvent) =>{
        e.preventDefault();
        document.cookie.split(";").forEach((cookie) => {
            const [name] = cookie.split("="); 
            document.cookie = `${name.trim()}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
        });
        await dispatch(userLogin({ username: userName, password: userPassword })).unwrap()
        navigate(`${ROUTES.HOME}`);
    }

    useEffect(() => {


    }, []);

    return (
        <>

        <MyHeader />

        <div className="MP_breadcrumbs">
            <BreadCrumbs
            crumbs={[
                { label: ROUTE_LABELS.SPARES, path: ROUTES.SPARES },
                { label: ROUTE_LABELS.LOG || "Вход" },
            ]}
            />
        </div>

        <div className="LoginPage">

        <form onSubmit={handleSubmit}>
            <h1>Войти</h1>
            <div className="form-group">
                <label htmlFor="username">Логин:</label>
                <input type="text" id="username" name="username" required 
                value = {userName}
                onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="password">Пароль:</label>
                <input type="password" id="password" name="password" required 
                value = {userPassword}
                onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            { loading && <h2> Загрузка... </h2> }
            { error && <h2> Ошибка входа: { error }  </h2> }
            <button type="submit">Войти</button>
        </form>
      </div>

      </>
    )

}
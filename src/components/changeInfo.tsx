import { FC, useEffect, useState } from "react"
import "./changeInfo.css"
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { api } from "../api";
import { MyOwnHeader } from "./MyOwnHeader";
import { ROUTES } from "../modules/MyRoutes";
import { delCookie } from "../slices/cookieSlice";
import { delFilter } from "../slices/filterSlice";
import { clearItems } from "../slices/itemSlice";
import { clearSpares } from "../slices/orderSlice";


export const ChangeInfo : FC = () => {

    const [userInfoPage, setUserInfo] = useState();
    const [newUserInfo, setNewInfo] = useState({
        username: '',
        email: '',
        first_name: '',
        last_name: '',
        password: '',
      })
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const getUser = async () => {

        const data = await api.user.userWhoamiList()

        return data

    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewInfo((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const filteredUserInfo = Object.fromEntries(
            Object.entries(newUserInfo).filter(([key, value]) => value.trim() !== "")
        );
        
        console.log(filteredUserInfo)

        if ("password" in filteredUserInfo){
            api.user.userPrivateUpdate(filteredUserInfo)
            .then((res) => {
                console.log(res)
                api.user.userLogoutCreate()
                    .then(() => {
                        dispatch(clearSpares())
                        dispatch(clearItems())
                        dispatch(delCookie())
                        dispatch(delFilter())
                        navigate(ROUTES.HOME);
                    })
            })
            .catch((err) => console.log(err));

        } else {
            api.user.userPrivateUpdate(filteredUserInfo)
            .then((res) => {console.log(res)
                            navigate(`${ROUTES.USER}/${userInfoPage?.id}`)
            })
            .catch((err) => console.log(err));
        }



    }

    const backToPrivate = () => {
        navigate(`${ROUTES.USER}/${userInfoPage?.id}`)
    }

    useEffect(() => {
        getUser()
          .then((data) => {setUserInfo(data.data); 
          })
          .catch((err) => console.error(err));

        console.log(userInfoPage)      
      }, []);

    return (
        <>
            <MyOwnHeader />
            <div className="mainNewInfo">
                <h1 className="header">Изменение информации</h1>
                
                <div className="infoSection">
                    <h2 className="subHeader">Старая информация</h2>
                    {userInfoPage ? (
                    <div className="oldInfo">
                        <p><span className="label">Логин:</span> {userInfoPage.username}</p>
                        <p><span className="label">Фамилия:</span> {userInfoPage.last_name}</p>
                        <p><span className="label">Имя:</span> {userInfoPage.first_name}</p>
                        <p><span className="label">Почта:</span> {userInfoPage.email}</p>
                    </div>
                    ) : (
                    <h1 className="noInfoMessage">Информации о пользователе нет</h1>
                    )}
                </div>

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
                            <label htmlFor="last_name" className="formLabel">Новая фамилия:</label>
                            <input
                            type="text"
                            id="last_name"
                            name="last_name"
                            value={newUserInfo.last_name}
                            onChange={handleChange}
                            className="formInput"
                            />
                        </div>

                        <div className="formGroup">
                            <label htmlFor="first_name" className="formLabel">Новое имя:</label>
                            <input
                            type="text"
                            id="first_name"
                            name="first_name"
                            value={newUserInfo.first_name}
                            onChange={handleChange}
                            className="formInput"
                            />
                        </div>

                        <div className="formGroup">
                            <label htmlFor="email" className="formLabel">Новая почта:</label>
                            <input
                            type="email"
                            id="email"
                            name="email"
                            value={newUserInfo.email}
                            onChange={handleChange}
                            className="formInput"
                            />
                        </div>

                        <div className="formGroup">
                            <label htmlFor="password" className="formLabel">Новый пароль*:</label>
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
                            <button onClick={backToPrivate} className="submitButton">Назад</button>
                        </div>


                        <p className="note">*При смене пароля вы выйдете из аккаунта</p>
                    </form>
                 </div>
        </div>
        </>

    )
}
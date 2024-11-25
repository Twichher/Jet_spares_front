import { FC, useState } from "react"
import "./LoginPage.css"
import { MyOwnHeader } from "./MyOwnHeader"
import { api } from "../api"
import { useDispatch } from 'react-redux';
import { setCookie } from "../slices/cookieSlice";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../modules/MyRoutes";


export const LoginPage : FC = () => {

    const dispatch = useDispatch()

    const [ error, setError ] = useState(false)
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        api.user.userLoginCreate(formData)
        .then (() => {
          const cookies = document.cookie.split(";").find((row) => row.startsWith("session_id="));
          if (cookies) {
            const sessionId = cookies.split("=")[1];
            dispatch(setCookie(sessionId));

          } else {
            setError(true)
          }

          console.log(cookies)

          navigate(ROUTES.SPARES)

        })
        .catch ((err) => {console.log(err)
                        setError(true)
        })
    }


    return (
        <>

        <MyOwnHeader />

        <div className="LoginPage">

        <form onSubmit={handleSubmit}>
        <h1>Войти</h1>
          <div className="form-group">
            <label htmlFor="username">Логин:</label>
            <input type="text" id="username" name="username" required 
            value = {formData.username}
            onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Пароль:</label>
            <input type="password" id="password" name="password" required 
            value = {formData.password}
            onChange={handleChange}
            />
          </div>
          { error && <h2> Ошибка входа  </h2> }
          <button type="submit">Войти</button>
        </form>
      </div>

      </>

    )

} 
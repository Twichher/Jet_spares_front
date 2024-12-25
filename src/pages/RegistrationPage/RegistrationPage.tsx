import { useState } from "react";
import { MyHeader } from "../MyHeader/MyHeader"
import "./RegistrationPage.css"
import { userRegistration } from "../../modules/asyncfunc/allasyncfunc";
import { BreadCrumbs } from "../BreadCrumbs/BreadCrumbs";
import { ROUTE_LABELS, ROUTES } from "../../modules/myroutes/MyRoutes";


export const RegistrationPage = () => {
    
    const [ regError, setError ] = useState("")

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        first_name: '',
        last_name: '',
        password: '',
      });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const info_log = await userRegistration(
                formData
            )(
              () => {}, 
              () => {}, 
              null
            );
        
            console.log("Результат запроса:", info_log.payload);
          } catch (error) {
            console.error("Ошибка при выполнении запроса:", error);
            setError(String(error))
          }

    }


    return (
        <>

        <MyHeader />

        <div className="MP_breadcrumbs">
            <BreadCrumbs
            crumbs={[
                { label: ROUTE_LABELS.SPARES, path: ROUTES.SPARES },
                { label: ROUTE_LABELS.REG || "Регистрация" },
            ]}
            />
        </div>

        <div className="RegistrationPage">
            <form onSubmit={handleSubmit}>
                <h1>Регистрация</h1>
                <div className="form-group">
                <label htmlFor="username">Логин:</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    maxLength={150}
                />
                </div>
                <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    maxLength={254}
                />
                </div>
                <div className="form-group">
                <label htmlFor="first_name">Имя:</label>
                <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    required
                    maxLength={150}
                />
                </div>
                <div className="form-group">
                <label htmlFor="last_name">Фамилия:</label>
                <input
                    type="text"
                    id="last_name"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    required
                    maxLength={150}
                />
                </div>
                <div className="form-group">
                <label htmlFor="password">Пароль:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    maxLength={128}
                />
                </div>
                { regError && <h1> Ошибка в регистрации </h1>}
                <button type="submit">Зарегистрироваться</button>
            </form>
        </div>



        </>
    )

}
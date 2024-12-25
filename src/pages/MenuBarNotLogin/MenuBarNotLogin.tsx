import { FC } from "react"
import "./MenuBarNotLogin.css"

interface GuestRegistrButtomType {
    buttonRegHandler : () => void,
    buttonLoginHandler : () => void,
}

export const MenuBarNotLogin: FC<GuestRegistrButtomType> = ( {buttonRegHandler, buttonLoginHandler} : GuestRegistrButtomType ) => {


    return (

        <div className="reglogbuttons">
        
            <button className="auth_btn login_buttom" onClick={buttonLoginHandler}> Войти </button>
            <button className="auth_btn reg_buttom" onClick={buttonRegHandler}> Регистрация </button>

        </div>

    )

}
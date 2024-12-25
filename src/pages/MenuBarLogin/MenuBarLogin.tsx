import { FC } from "react";
import { useSelector } from "react-redux";
import "./MenuBarLogin.css"
import { RootState } from "../../modules/slieces/myStore";

interface GuestRegistrButtomType {
    buttonProfileHandler : (username : string) => void,
    buttonOrderHandler : () => void,
}

export const MenuBarLogin: FC<GuestRegistrButtomType> = ( {buttonProfileHandler, buttonOrderHandler} : GuestRegistrButtomType ) => {

    const username = useSelector((state: RootState) => state.cookie.username);
    const data =  useSelector((state: RootState) => state.order.data);
    const idOrder = useSelector((state: RootState) => state.order.id_order);

    return (

        <div className="reglogbuttons">

        {username ? (
            <button className="auth_btn login_buttom" onClick={() => buttonProfileHandler(username)}> {username} </button>
        ) : (
            <button className="auth_btn login_buttom" onClick={() => buttonProfileHandler("")}> No user </button>
        )}
            
        {idOrder && data?.data.status_order == 0 ? (
                <button
                    className="auth_btn reg_buttom"
                    onClick={buttonOrderHandler}
                >
                    Корзина: {data?.count_in_order}
                </button>
                ) : (
                <button
                    className="auth_btn reg_buttom disabled"
                    disabled
                > Корзина
                </button>
                )}
        </div>

    )


}
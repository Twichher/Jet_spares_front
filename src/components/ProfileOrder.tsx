import { FC, useEffect, useState } from "react"
import "./GuestRegistrButtom.css"
import { api } from "../api"
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../slices/sparesRed";
import { setCount, setIdOrder } from "../slices/orderSlice";
import { setIdUserR } from "../slices/cookieSlice";


interface GuestRegistrButtomType {
    buttonProfileHandler : (idUser : string) => void,
    buttonOrderHandler : () => void,
}

export const ProfileOrder: FC<GuestRegistrButtomType> = ( {buttonProfileHandler, buttonOrderHandler} : GuestRegistrButtomType ) => {

    const [curusername, setUsername] = useState('')
    const [idUser, setIdUser] = useState('')
    const countOrder = useSelector((state: RootState) => state.order.countOrder);
    const idOrder = useSelector((state: RootState) => state.order.idOrder);
    const dispatch = useDispatch<AppDispatch>();

    const getUser = async () =>{

        const data = await api.user.userWhoamiList()

        return data

    }

    const getOrder = async () => {
        const data = await api.spares.sparesListList()

        dispatch(setCount(data.data["Count in Order"]))
        dispatch(setIdOrder(data.data["Jet Order"]))
        
        return
    }



    useEffect(() => {
        getUser()
            .then ((data) => {

                console.log(data.data["Message"])
                // if ("Message" in data.data) {

                // }
                setUsername(data.data.username);
                setIdUser(data.data.id);
                setIdUserR(Number(data.data.id))

            });

        getOrder()

    }, [countOrder])
    

    return (

        <div className="reglogbuttons">
        
            <button className="auth_btn login_buttom" onClick={() => buttonProfileHandler(idUser)}> {curusername} </button>
            {idOrder ? (
                    <button
                        className="auth_btn reg_buttom"
                        onClick={buttonOrderHandler}
                    >
                        Order: {countOrder}
                    </button>
                    ) : (
                    <button
                        className="auth_btn reg_buttom disabled"
                        disabled
                    >
                        Order: {countOrder}
                    </button>
                    )}
        </div>

    )

}
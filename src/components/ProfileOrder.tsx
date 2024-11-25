import { FC, useEffect, useState } from "react"
import "./GuestRegistrButtom.css"
import { api } from "../api"
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../slices/sparesRed";
import { setCount, setIdOrder } from "../slices/orderSlice";


interface GuestRegistrButtomType {
    buttonProfileHandler : () => void,
    buttonOrderHandler : () => void,
}

export const ProfileOrder: FC<GuestRegistrButtomType> = ( {buttonProfileHandler, buttonOrderHandler} : GuestRegistrButtomType ) => {

    const [curusername, setUsername] = useState('')
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
            .then ((data) => setUsername(data.data.username));

        getOrder()

    }, [countOrder])
    

    return (

        <div className="reglogbuttons">
        
            <button className="auth_btn login_buttom" onClick={buttonProfileHandler}> {curusername} </button>
            <button className="auth_btn reg_buttom" onClick={buttonOrderHandler} disabled={idOrder === null}> Order: {countOrder} </button>

        </div>

    )

}
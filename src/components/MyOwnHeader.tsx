import { FC } from "react"
import { Link } from "react-router-dom"
import { ROUTES } from "../modules/MyRoutes"
import "./MyOwnHeader.css"

export const MyOwnHeader : FC = () => {

    return (

        <div className="navi">

            {/* <a onClick={onClickHandler}>
                <img className="main_icon" src="main_icon.png"/>
            </a> */}

            <Link to={ROUTES.SPARES}>
                <img className="main_icon" src="../main_icon.png"/>
            </Link>
            <p className="headText">Мировые запчасти</p>

        </div>

    )
}
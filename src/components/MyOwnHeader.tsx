import { FC } from "react"
import { Link } from "react-router-dom"
import { ROUTES } from "../modules/MyRoutes"
import "./MyOwnHeader.css"

export const MyOwnHeader : FC = () => {

    return (

    <nav className="mainDiv">

        <div className="navi">

            <Link to={ROUTES.HOME}>
                <img className="home_icon" src="/home_icon.png" />
            </Link>

            <Link to={ROUTES.SPARES}>
                <img className="main_icon" src="/spares_icon.png" />
            </Link>

        </div>

        <div className="title">
            <p className="headText">Мировые запчасти</p>
        </div>

    </nav>

    )
}
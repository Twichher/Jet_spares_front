import { FC } from "react"
import { Link } from "react-router-dom"
import { ROUTES } from "../modules/MyRoutes"
import "./MyOwnHeader.css"
import { useSelector } from "react-redux"
import { RootState } from "../slices/sparesRed"

export const MyOwnHeader : FC = () => {

    const cookie = useSelector((state:RootState) => state.cookie.cookie)
    const id_user = useSelector((state:RootState) => state.cookie.id_user)

    return (

    <nav className="mainDiv">

        <div className="navi">

            <Link to={ROUTES.HOME}>
                <img className="home_icon" src="/home_icon.png" />
            </Link>

            <Link to={ROUTES.SPARES}>
                <img className="main_icon" src="/spares_icon.png" />
            </Link>

            {cookie  && 
            
            <Link to={`${ROUTES.USER}/${id_user}`}>
                <img className="main_icon" src="/private_icon.png" />
            </Link>
            
            }

            {!cookie && 
            
            <Link to={ROUTES.LOG}>
                <img className="main_icon" src="/private_icon.png" />
            </Link>

            }



        </div>

        <div className='nav__mobile-wrapper' onClick={(event) => event.currentTarget.classList.toggle('active')} >
            <div className='nav__mobile-target' />
                <div className='nav__mobile-menu'>
                    <Link to={ROUTES.HOME}>
                        <img className="home_icon" src="/home_icon.png" />
                    </Link>

                    <Link to={ROUTES.SPARES}>
                        <img className="main_icon" src="/spares_icon.png" />
                    </Link>

                </div>
        </div>


        <div className="title">
            <p className="headText">Мировые запчасти</p>
        </div>

    </nav>

    )
}
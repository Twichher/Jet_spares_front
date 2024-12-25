import { Link } from "react-router-dom";
import "./MyHeader.css"
import { ROUTES } from "../../modules/myroutes/MyRoutes";
import { useEffect } from "react";
// import { getOrderInfo } from "../../modules/asyncfunc/allasyncfunc";

export const MyHeader = () => {

    // (async () => {
    //     try {
    //       const info_log = await getOrderInfo({
    //         id: "10"
    //       })(
    //         () => {}, // фиктивный dispatch
    //         () => {}, // фиктивный getState
    //         null
    //       );
      
    //     //   if (info_log.payload && "spares" in info_log.payload)

    //     //   {
    //     //     console.log(info_log.payload.spares[1].spare)
    //     //   }

    //     } catch (error) {
    //       console.error("Ошибка при выполнении запроса:", error);
    //     }
    //   })();


    useEffect( () => {


      }, [] )

    
    
    return (
        <nav className="mainDiv">

            <div className="navi">

                <Link to={ROUTES.HOME}>
                    <p> Главная </p>
                </Link>

                <Link to={ROUTES.SPARES}>
                    <p> Запчасти </p>
                </Link>
            </div>

            <div className="title">
                <p className="headText">Мировые запчасти</p>
            </div>




        </nav>
    )

}



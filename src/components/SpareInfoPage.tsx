import { FC, useEffect, useState } from "react"
import { BreadCrumbs } from "./BreadCrumbs"
import { ROUTE_LABELS, ROUTES } from "../modules/MyRoutes"
import { getSpareByID } from "../modules/MyApiSpares"
import { MySpares } from "../modules/MyInterface"
import { useParams } from "react-router-dom"
import { MyOwnHeader } from "./MyOwnHeader"
import "./SpareInfoPage.css"


export const SpareInfoPage : FC = () => {

    const [spareInfo, setSpareInfo] = useState<MySpares>()
    const {id_spare} = useParams()
    let image : string = ''

    useEffect( () => {
        if (id_spare) {

            getSpareByID(id_spare)
                .then((test) => {
                    setSpareInfo(test);
                });
                
        }

      }, [id_spare] )

    if (spareInfo?.url_spare === undefined) {image = "../no_img_spare.jpg"}
    else {image = `${spareInfo.url_spare}`}


    return (
        <>

        <MyOwnHeader />


        <div className="MP_breadcrumbs">
            <BreadCrumbs
            crumbs={[
                { label: ROUTE_LABELS.SPARES, path: ROUTES.SPARES },
                { label: spareInfo?.name_spare || "Запчасть" },
            ]}
            />
        </div>

        {spareInfo ? (

            <div className="descce_div">

                <div className="name_spare_div">
                    <p className="name_spare">{ spareInfo.name_spare }</p>
                </div>

                <div className="pic_spare_div">
                    <img className="pic_spare" src={ image }/>
                </div>

                <div className="price_spare_div">
                    <p className="price_spare">{ Number(spareInfo.price_spare) } ₽</p>
                </div>

                <div className="desc_spare_div">
                    <p className="desc_spare">{ spareInfo.description_spare }</p>
                </div>

                <div className="mbotom"/>

            </div>

        ) : (
            <div className="loading">
                <h1> Loading... </h1>
            </div>
        )}
  
        </>
    )
}
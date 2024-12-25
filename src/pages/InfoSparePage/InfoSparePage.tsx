import { useParams } from "react-router-dom"
import { ROUTE_LABELS, ROUTES } from "../../modules/myroutes/MyRoutes"
import { BreadCrumbs } from "../BreadCrumbs/BreadCrumbs"
import { MyHeader } from "../MyHeader/MyHeader"
import { useEffect, useState } from "react"
import { getSpareById } from "../../modules/asyncfunc/allasyncfunc"
import "./infoSparePage.css"
import { Error404 } from "../errors/Error404"

interface Spare {
    id_spare: number;
    name_spare: string;
    description_spare: string;
    status_spare?: 0 | 1;
    url_spare: string;
    price_spare: number;
  }


export const InfoSparePage = () => {

    const {id_spare} = useParams()
    const [spareInfo, setSpareInfo] = useState<Spare | null>(null)
    const [error, setError] = useState<boolean>(false);

    const fetchSpareInfo = async () => {
      if (id_spare) {
        try {
          const info_log = await getSpareById({ id_spare })(
            () => {}, 
            () => {}, 
            null
          );
          console.log(info_log.payload)
          if (info_log.payload && !("message" in info_log.payload)) {
            setSpareInfo(info_log.payload as Spare);
            setError(false); 
          } else {
            setError(true);
          }

        } catch (error) {
          console.error("Ошибка при выполнении запроса:", error);
        }
      }
    };


    useEffect(() => {
    
        fetchSpareInfo();

      }, [id_spare]);


    return (

        <>
        <MyHeader />


        <div className="MP_breadcrumbs">
            <BreadCrumbs
            crumbs={[
                { label: ROUTE_LABELS.SPARES, path: ROUTES.SPARES },
                { label: spareInfo?.name_spare || "Запчасть" },
            ]}
            />
        </div>

        {spareInfo && !error ? (
          

            <div className="descce_div">

                <div className="name_spare_div">
                    <p className="name_spare">{ spareInfo.name_spare }</p>
                </div>

                <div className="pic_spare_div">
                    <img className="pic_spare" src={ spareInfo.url_spare }/>
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
          <Error404 />
        )}
        </>

    )

}
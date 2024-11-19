import "./MainPageSpares.css"
import { BreadCrumbs } from "./components/BreadCrumbs"
import { ROUTES, ROUTE_LABELS } from "./modules/MyRoutes"
import FinderItem from "./components/FinderItem"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSpareByPrice } from "./modules/MyApiSpares";
import { MySpares } from "./modules/MyInterface";
import { OneSpareitem } from "./components/OneSpareItem";
import { MyOwnHeader } from "./components/MyOwnHeader";
import { useDispatch, useSelector } from 'react-redux';
import { setPriceBy, setPriceUp } from "./slices/filterSlice";
import { RootState } from "./slices/sparesRed";



export const MainPageSpares = () => {

    const dispatch = useDispatch();
    const price_by = useSelector((state: RootState) => state.filter.price_by);
    const price_up = useSelector((state: RootState) => state.filter.price_up);

    const [spares, SetSpare] = useState<MySpares[]>([])
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true)

    const handlePriceByChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setPriceBy(event.target.value));
      };
    
      const handlePriceUpChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setPriceUp(event.target.value));
      };


    useEffect( () => {
        setLoading(true)

        getSpareByPrice(price_by, price_up)
            .then((test) => {
                SetSpare(test.Spares);
            })
            .finally(() => {
                setLoading(false); 
            });

      }, [] )

    const onSubmitFinderHandler = () => {

        setLoading(true)

        getSpareByPrice(price_by, price_up)
            .then((test) => {
                SetSpare(test.Spares);
            })
            .finally(() => {
                setLoading(false); 
            });


    }

    const imageClickHandler = (id_spare : number) => {

        navigate(`${ROUTES.SPARES}/${id_spare}`);

    }

    return (

        <header>

                <MyOwnHeader />


                <div className="MP_Finder">

                    <FinderItem 
                        value_by={price_by}
                        value_up={price_up}
                        setValueby={handlePriceByChange}
                        setValueup={handlePriceUpChange}
                        onSubmit={onSubmitFinderHandler}
                    />

                </div>

                <div className="MP_breadcrumbs">
                    <BreadCrumbs 
                        crumbs={[{ label: ROUTE_LABELS.SPARES }]} 
                    />
                </div>

                {loading && ( 
                    <div className="loading">
                        <h1> Loading... </h1>
                    </div>
                )}

                <div className="space">
                    <div className="container">

                    {Array.isArray(spares) && spares.map(spare => (
                        <OneSpareitem 
                            spare={spare} 
                            key={spare.id_spare} 
                            imageClickHandler={() => imageClickHandler(spare.id_spare)}
                        />
                    ))}   

                    </div>
                </div>



        </header>

    )


}
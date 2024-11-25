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
import { api } from "./api";
import { GuestRegistrButtom } from "./components/GuestRegistrButtom";
import { ProfileOrder } from "./components/profileOrder";
import { addSpare } from "./slices/orderSlice";


export const MainPageSpares = () => {


    const dispatch = useDispatch();
    const price_by = useSelector((state: RootState) => state.filter.price_by);
    const price_up = useSelector((state: RootState) => state.filter.price_up);


    const cookie = useSelector((state:RootState) => state.cookie.cookie)

    const [spares, SetSpare] = useState<MySpares[]>([])
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true)

    const idOrder = useSelector((state: RootState) => state.order.idOrder);

    const handlePriceByChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setPriceBy(event.target.value));
      };
    
    const handlePriceUpChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setPriceUp(event.target.value));
      };

    // const testHandler = async () => {
    //     const { data  } = await api.spares.sparesInfoList('1')
    //     console.log (data)
    // }

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

    const buttonRegHandler = () => {
        navigate(ROUTES.REG);
    }

    const buttonLoginHandler = () => {
        navigate(ROUTES.LOG);
    }


    const buttonProfileHandler = () => {
        console.log("Profile")
    } 

    const buttonOrderHandler = (id_order : number) => {
        navigate(`${ROUTES.ORDER}/${id_order}`);
    }

    const buybtnClickHandler = (id_spare : number) => {
        api.spares.sparesToOrderCreate(String(id_spare))
            .then((res) => console.log(res))
            .catch((err) => console.log(err));

        dispatch(addSpare())
        // api.user.userWhoamiList()
        //     .then((data) => console.log(data))
    }

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

    return (

        <header>

                <MyOwnHeader />



                {/* <button onClick={testHandler}> Кнопочка </button> */}


                <div className="MP_Finder_Buttoms">

                    <FinderItem 
                        value_by={price_by}
                        value_up={price_up}
                        setValueby={handlePriceByChange}
                        setValueup={handlePriceUpChange}
                        onSubmit={onSubmitFinderHandler}
                    />

                    {!cookie && <GuestRegistrButtom 
                        buttonLoginHandler={buttonLoginHandler}
                        buttonRegHandler={buttonRegHandler}
                    />}

                    {cookie && <ProfileOrder 
                        buttonProfileHandler={buttonProfileHandler}
                        buttonOrderHandler={() => buttonOrderHandler(idOrder)}
                    />}

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
                            buybtnClickHandler = {() => buybtnClickHandler(spare.id_spare)}
                        />
                    ))}   

                    </div>
                </div>



        </header>

    )


}
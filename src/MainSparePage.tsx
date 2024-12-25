import { MyHeader } from "./pages/MyHeader/MyHeader"
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "./modules/slieces/myStore"
import FinderItem from "./pages/FinderItem/FinderItem";
import { useEffect, useState } from "react";
import { setPriceBy, setPriceUp } from "./modules/slieces/filterSlice";
import { getOrderInfo, getSparesByPrice, Spare, toOrderByIdSpare } from "./modules/asyncfunc/allasyncfunc";
import { SpareItemOnMain } from "./pages/SpareItemOnMain/SpareItemOnMain";
import { BreadCrumbs } from "./pages/BreadCrumbs/BreadCrumbs";
import { ROUTE_LABELS, ROUTES } from "./modules/myroutes/MyRoutes";
import "./MainSparePage.css"
import { useNavigate } from "react-router-dom";
import { MenuBarNotLogin } from "./pages/MenuBarNotLogin/MenuBarNotLogin";
import { MenuBarLogin } from "./pages/MenuBarLogin/MenuBarLogin";
import { clearOrderInfo } from "./modules/slieces/orderSlice";

export const MainSparePage = () => {



    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const [spares, setSpare] = useState<Spare[]>([])


    const price_by = useSelector((state: RootState) => state.filter.price_by);
    const price_up = useSelector((state: RootState) => state.filter.price_up);
    const cookie = useSelector((state: RootState) => state.cookie.cookie);
    const username = useSelector((state: RootState) => state.cookie.username);
    const id_order = useSelector((state: RootState) => state.order.id_order);

    const buttonLoginHandler =() => {
        navigate(`${ROUTES.LOG}`);
    }

    const buttonRegHandler =() => {
        navigate(`${ROUTES.REG}`);
    }

    const handlePriceByChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setPriceBy(event.target.value));
    };
    
    const handlePriceUpChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setPriceUp(event.target.value));
    };

    const buttonProfileHandler = () => {
        navigate(`${ROUTES.USER}/${username}`);
    }

    const buttonOrderHandler = () => {
        navigate(`${ROUTES.ORDER}/${id_order}`)
    }

    const onSubmitFinderHandler = () => {

        getSpares()

    }

    const imageClickHandler = (id: number) => { 

        navigate(`${ROUTES.SPARES}/${id}`);

    }

    const getSpares = async () => {        
        try {
            
            const spares = await getSparesByPrice(
                {price_by : Number(price_by), price_up : Number(price_up)}
            )
            (
            () => {}, 
            () => {}, 
            null
            );
        
            if (spares.payload && "Spares" in spares.payload){
                setSpare(spares.payload.Spares)
                console.log(spares.payload)

                if ("Jet Order" in spares.payload) {

                    if (spares.payload["Jet Order"]) {

                        const idOrder = String(spares.payload["Jet Order"])
                        dispatch(getOrderInfo({id: idOrder}));

                    } else {
                        dispatch(clearOrderInfo())
                    }

                }
            }

        } catch (error) {
            console.error("Ошибка при выполнении запроса:", error);
        }   

    }

    const buybtnClickHandler = async (id : number) => {

        try {


            await toOrderByIdSpare(
                {id : String(id)}
            )
            (
            () => {}, 
            () => {}, 
            null
            );

            getSpares()


        } catch (error) {
            console.error("Ошибка при выполнении запроса:", error);
        }  


    }

    useEffect( () => {

        getSpares()

      }, [] )

    return (

            <header>

            <MyHeader />

            <div className="MP_Finder_Buttoms">

                <FinderItem 
                    value_by={price_by}
                    value_up={price_up}
                    setValueby={handlePriceByChange}
                    setValueup={handlePriceUpChange}
                    onSubmit={onSubmitFinderHandler}
                />

                {!cookie && <MenuBarNotLogin 
                    buttonLoginHandler={buttonLoginHandler}
                    buttonRegHandler={buttonRegHandler} />}
                {cookie && <MenuBarLogin 
                    buttonProfileHandler = {buttonProfileHandler}
                    buttonOrderHandler = {buttonOrderHandler} />}

            </div>

            <div className="MP_breadcrumbs">
                <BreadCrumbs 
                    crumbs={[{ label: ROUTE_LABELS.SPARES }]} 
                />
            </div>


            <div className="space">
                <div className="container">

                {Array.isArray(spares) && spares.map(spare => (
                    <SpareItemOnMain 
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
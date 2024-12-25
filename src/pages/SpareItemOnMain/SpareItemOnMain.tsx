import { Spare } from "../../modules/asyncfunc/allasyncfunc";
import "./SpareItemOnMain.css"
import { RootState } from "../../modules/slieces/myStore"
import { useSelector } from "react-redux";

interface SpareItemOnMainType {
    spare : Spare,
    imageClickHandler: () => void;
    buybtnClickHandler: () => void;
}

export const SpareItemOnMain = ({spare, imageClickHandler, buybtnClickHandler} : SpareItemOnMainType) => {

    const { cookie } = useSelector(
        (state: RootState) => state.cookie
    );

    const clickAdd = () => {
        // dispatch(addItem(spare.id_spare));
        buybtnClickHandler()
    }


    return (

        <div className="spares_div">
            <div className="spare_pic_div">
                <a onClick={imageClickHandler}>
                    <img className="spare_pic" src={ spare.url_spare }/>
                </a>
            </div>
            <div className="spare_name_div">
                <a className="spare_desc">
                    { spare.name_spare }
                </a>
            </div>
            <div className="spare_price_div">
                <p className="spare_price">{ Number(spare.price_spare) } ₽</p>
                { cookie && <button className="buy_btn" onClick={clickAdd}>Купить</button>}

            </div>

        </div>


    )

}
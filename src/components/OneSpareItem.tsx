import { FC } from "react"
import { MySpares } from "../modules/MyInterface"
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../slices/sparesRed";
import { addItem } from "../slices/itemSlice";
import "./OneSpareItem.css"

interface OneSpareItemTypes {
    spare : MySpares,
    imageClickHandler: () => void;
    buybtnClickHandler: () => void;
}

export const OneSpareitem : FC<OneSpareItemTypes> = ( {spare, imageClickHandler, buybtnClickHandler} : OneSpareItemTypes) => {

    let image : string = ''
    const currentHost = window.location.hostname;

    const dispatch = useDispatch<AppDispatch>();
    const isAdded = useSelector(
      (state: RootState) => state.item.addedItems[spare.id_spare] || false
    );

    if (spare.url_spare === undefined) {
        image = "no_img_spare.jpg"
    } else {
        image = spare.url_spare.replace("127.0.0.1", currentHost);
    }

    const clickAdd = () => {
        dispatch(addItem(spare.id_spare));
        buybtnClickHandler()
    }


    return (

        <div className="spares_div">
            <div className="spare_pic_div">
                <a onClick={imageClickHandler}>
                    <img className="spare_pic" src={ image }/>
                </a>
            </div>
            <div className="spare_name_div">
                <a className="spare_desc">
                    { spare.name_spare }
                </a>
            </div>
            <div className="spare_price_div">
                <p className="spare_price">{ Number(spare.price_spare) } ₽</p>
                { !isAdded && <button className="buy_btn" onClick={clickAdd}>Купить</button>}
                { isAdded && <button className="buy_btn disabled" disabled>Добавлено</button>}
            </div>

        </div>
        

    )


}
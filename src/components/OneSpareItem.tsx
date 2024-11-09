import { FC } from "react"
import { MySpares } from "../modules/MyInterface"
import "./OneSpareItem.css"

interface OneSpareItemTypes {
    spare : MySpares,
    imageClickHandler: () => void;
}

export const OneSpareitem : FC<OneSpareItemTypes> = ( {spare, imageClickHandler} : OneSpareItemTypes) => {

    let image : string = ''

    if (spare.url_spare === undefined) {
        image = "no_img_spare.jpg"
    } else {
        image = spare.url_spare
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
            </div>

        </div>
        

    )


}
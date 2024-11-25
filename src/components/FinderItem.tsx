import { FC } from 'react'
import './FinderItem.css'

interface Props {
    value_by: string
    value_up: string
    setValueby: (event: React.ChangeEvent<HTMLInputElement>) => void
    setValueup: (event: React.ChangeEvent<HTMLInputElement>) => void
    onSubmit: () => void
}

function getRandomFloat () {
    return (Math.random() * 100).toFixed(0)
}



const FinderItem: FC<Props> = ({ value_by, value_up, setValueby, setValueup, onSubmit}) => {

    

    const rgba_text = `rgba(${getRandomFloat()}, ${getRandomFloat()}, ${getRandomFloat()}, 0.9)`

    return(
        <>

        <div className="sort_by_price_div" >

            <p className="price_by_text">Поиск по цене: от</p>
            <input name="price_by" placeholder="Цена от" type="number" className="input_sort_by"
                value={value_by}
                onChange={setValueby}/>
            <p className="price_up_text">до</p>
            <input name="price_up" placeholder="Цена до" type="number" className="input_sort_up"
                value={value_up}
                onChange={setValueup}/>
            <button type="submit" className="sort_btn" onClick={onSubmit} style={{ backgroundColor : rgba_text }}>Найти</button>

        </div>

        

        <div className="sort_by_price_div_mobile" >

            <p className="search_text">Поиск по цене</p>
            <p className="price_up_text">от</p>
            <input name="price_by" placeholder="Цена от" type="number" className="input_sort_by"
                value={value_by}
                onChange={setValueby}/>
            <p className="price_up_text">до</p>
            <input name="price_up" placeholder="Цена до" type="number" className="input_sort_up"
                value={value_up}
                onChange={setValueup}/>
            <button type="submit" className="sort_btn" onClick={onSubmit} style={{ backgroundColor : rgba_text }}>Найти</button>

        </div>

        </>

    )
}

export default FinderItem



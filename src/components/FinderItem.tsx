import { FC } from 'react'
import './FinderItem.css'

interface Props {
    value_by: string
    value_up: string
    setValueby: (value_by : string) => void
    setValueup: (value_up : string) => void
    onSubmit: () => void
}

function getRandomFloat () {
    return (Math.random() * 100).toFixed(0)
}



const FinderItem: FC<Props> = ({ value_by, value_up, setValueby, setValueup, onSubmit}) => {

    const rgba_text = `rgba(${getRandomFloat()}, ${getRandomFloat()}, ${getRandomFloat()}, 0.9)`

    return(

        <div className="sort_by_price_div" >


            <p className="price_by_text">Поиск по цене: от</p>
            <input name="price_by" placeholder="Цена от" type="number" className="input_sort_by"
                value={value_by}
                onChange={(event => setValueby(event.target.value))}/>
            <p className="price_up_text">до</p>
            <input name="price_up" placeholder="Цена до" type="number" className="input_sort_up"
                value={value_up}
                onChange={(event => setValueup(event.target.value))}/>
            <button type="submit" className="sort_btn" onClick={onSubmit} style={{ backgroundColor : rgba_text }}>Найти</button>

        </div>

    )
}

export default FinderItem



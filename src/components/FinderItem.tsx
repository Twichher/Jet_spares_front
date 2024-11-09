import { FC } from 'react'
import './FinderItem.css'

interface Props {
    value_by: string
    value_up: string
    setValueby: (value_by : string) => void
    setValueup: (value_up : string) => void
    onSubmit: () => void
}

const FinderItem: FC<Props> = ({ value_by, value_up, setValueby, setValueup, onSubmit}) => (

    <div className="sort_by_price_div">


        <p className="price_by_text">Поиск по цене: от</p>
        <input name="price_by" placeholder="Цена от" type="number" className="input_sort_by"
            value={value_by}
            onChange={(event => setValueby(event.target.value))}/>
        <p className="price_up_text">до</p>
        <input name="price_up" placeholder="Цена до" type="number" className="input_sort_up"
            value={value_up}
            onChange={(event => setValueup(event.target.value))}/>
        <button type="submit" className="sort_btn" onClick={onSubmit}>Очистить</button>

    </div>
)

export default FinderItem
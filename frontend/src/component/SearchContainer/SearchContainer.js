import './styles.scss';
import { AutoComplete, Input } from 'antd'
import { useEffect, useState } from 'react';
import { getAllSymbol } from '../../service/binance.service';

const SearchContainer = ({ fetchData }) => {

    const [auto, setAuto] = useState([])

    useEffect(() => {
        fetchOption()
    }, [])

    const fetchOption = async () => {
        const response = await getAllSymbol()
        setAuto(response)
    }

    return (
        <div className="SearchContainer flex-col">
            <h2>Get your coin price!</h2>
            <AutoComplete
                style={{
                    width: 200,
                }}
                options={auto}
                placeholder="Insert coin symbol"
                filterOption={(inputValue, option) =>
                    option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                }
                onSelect={data => fetchData(data)}
            />
        </div>
    );
}

export default SearchContainer;

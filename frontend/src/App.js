import { useState } from 'react';
import './App.scss';
import CandleChart from './component/Chart/Chart';
import Header from './component/Header/Header';
import Loading from './component/loading/Loading';
import SearchContainer from './component/SearchContainer/SearchContainer';
import { getPriceBySymbol } from './service/binance.service';

const App = () => {

  const [data, setData] = useState([])
  const [coinName, setCoinName] = useState("")
  const [loading, setLoading] = useState(false)

  const fetchData = async (symbol) => {
    setLoading(true)
    const res = await getPriceBySymbol(symbol)
    setData(res)
    setCoinName(symbol)
    setLoading(false)
  }
  return (
    <div className="App flex-col">
      <Header />
      <SearchContainer fetchData={fetchData} />
      {loading ? <Loading />  : data.length > 0 && <CandleChart data={data} coinName={coinName} />}
    </div>
  );
}

export default App;

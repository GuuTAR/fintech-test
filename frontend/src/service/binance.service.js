import axios from 'axios'

const host = "http://localhost:8000/api"

const header = {
    'Content-Type': 'application/json',
}

export const getPriceBySymbol = async (symbol) => {
    try {
        const response = await axios.get(`${host}/binance/candlestick/${symbol}`, {
            headers: header
        })
        return response.data
    } catch (error) {
        console.error(error)
    }
    
}

export const getAllSymbol = async () => {
    try {
        const response = await axios.get(`${host}/binance/symbol`, {
            headers: header
        })
        return response.data
    } catch (error) {
        console.error(error)
    }
    
}
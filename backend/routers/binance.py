from fastapi import APIRouter
from binance.client import Client
import datetime

router = APIRouter(
    prefix="/api/binance",
    tags=["Binance"],
    responses={404: {"message": "Not found"}}
)

@router.get("/candlestick/{SYMBOL}")
async def get_candlestick(SYMBOL : str):
    binance_client = Client()

    NOW = str(datetime.datetime.now())
    ONE_WEEK_AGO = str(datetime.datetime.now() - datetime.timedelta(days=7))

    # Input datetime must be string
    candles = binance_client.get_historical_klines(SYMBOL, Client.KLINE_INTERVAL_15MINUTE, ONE_WEEK_AGO, NOW)

    output = []

    # Add key to each index of data
    for cs in candles :
        time = datetime.datetime.fromtimestamp((cs[0]/1000)).strftime('%Y-%m-%d %H:%M:%S')

        # Use only index 0 to 5
        price_in_time = [float(d) for d in cs[1:5]]
        output.append([time] + price_in_time)

    return output

@router.get("/symbol")
async def get_all_symbol():
    binance_client = Client()
    all_tickets = binance_client.get_all_tickers()
    output = []
    for coin in all_tickets:
        output.append({'value': coin['symbol']}) 
    
    return output
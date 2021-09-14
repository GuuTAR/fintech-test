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

    keys = ["Time", "Open", "High", "Low", "Close"]

    output = []

    # Add key to each index of data
    for cs in candles :
        
        cs[0] = datetime.datetime.fromtimestamp((cs[0]/1000)).strftime('%Y-%m-%d %H:%M:%S')

        # Use only index 0 to 5
        price_dict = dict(zip(keys, cs[0:5]))
        output.append(price_dict)

    return output
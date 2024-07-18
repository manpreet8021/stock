import axios from "axios";
import asyncHandler from "../handler/asyncHandler.js";
import { getCoinByParams, insertCoins } from "../model/coinModel.js";
import { getPriceByParams, insertPrice } from "../model/priceModel.js";
import { connectedUser } from "../config/webSocketConfig.js";

const URL = "https://api.coingecko.com/api/v3"
const header = {'x-cg-demo-api-key': 'CG-hn3C4GrCb5npGyq11sFqFhHw', 'accept': 'application/json'}
const coins = ['bitcoin','cardano','apecoin','ripple','dogecoin']

const getCryptoDetail = async() => {
    try {
        const response  = await axios({
            method: 'GET',
            url: `${URL}/coins/markets?vs_currency=inr&ids=${encodeURIComponent(coins.join(','))}`,
            headers: {
                'x-cg-demo-api-key': 'CG-hn3C4GrCb5npGyq11sFqFhHw'
            }
        });
        const data = response?.data.map(coin => ({
            coin_id: coin.id,
            name: coin.name,
            symbol: coin.symbol,
            thumbnail: coin.image,
            active: 1
        }));

        await insertCoins(data);

    } catch (error) {
        res.status(400)
        throw new Error("Failed fetching the stock detail")
    }
};

const getPriceForCoins = asyncHandler(async() => {
    try{
        const response  = await axios({
            method: 'GET',
            url: `${URL}/simple/price?vs_currencies=inr&ids=${encodeURIComponent(coins.join(','))}&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=true`,
            headers: {
                'x-cg-demo-api-key': 'CG-hn3C4GrCb5npGyq11sFqFhHw'
            }
        });
    
        const data = Object.keys(response.data).map(data => ({
            coin_id: data,
            price: response.data[data].inr,
            market_cap: response.data[data].inr_market_cap,
            h24_vol: response.data[data].inr_24h_vol,
            h24_change: response.data[data].inr_24h_change,
            last_updated_at: new Date(response.data[data].last_updated_at * 1000)
        }));
    
        const insertedData = await insertPrice(data);

        connectedUser.forEach(user => {
            user.send(JSON.stringify(insertedData));
        });
    } catch (error) {
        console.log(error)
    }
})

const getPriceDetail = asyncHandler(async(req, res) => {
    let params = {}

    const { id } = req.params

    if(id) {
        params = {
            coin_id: id
        }
    }
    
    const data = await getPriceByParams(params)

    res.status(200).json(data)
})

const getCoins = asyncHandler(async(req, res) => {
    let data = await getCoinByParams({})
    if(data.length === 0) {
        await getCryptoDetail()
        data = await getCoinByParams({})
    }
    res.status(200).json(data)
})

export { getPriceForCoins, getPriceDetail, getCoins }
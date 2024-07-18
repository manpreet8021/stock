'use client'

import { useGetCoinQuery, useGetPriceQuery } from "@/store/slice/api/stock";
import { AppDispatch, RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { coinInterface, setData, setSelectedCoin } from "@/store/slice/stockSlice";
import { Button, Table } from "react-bootstrap";

export default function Home() {
  const dispatch: AppDispatch = useDispatch();
  const data = useSelector((state: RootState) => state.stock.data);
  const coins = useSelector((state: RootState) => state.stock.coins);
  const { isLoading } = useGetCoinQuery({});
  const coin = useSelector((state: RootState) => state.stock.selectedCoin);
  const { isLoading: priceApiLoading, refetch } = useGetPriceQuery(coin)

  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:5000`)

    ws.onmessage = (response) => {
      const data = JSON.parse(response.data);

      const filteredData = coin
        ? data.filter((item: coinInterface) => item.coin_id === coin)
        : data;
      
      dispatch(setData(filteredData))
    }

    return () => {
      ws.close();
    }
  }, [coin, dispatch])

  const handleChangeCoin = async(newCoin: string) => {
    if(newCoin !== 'All')
      dispatch(setSelectedCoin(newCoin))
    else
      dispatch(setSelectedCoin(''))
  };

  useEffect(()=>{
    refetch()
  },[coin])


  return (
    <>
      <div className="container">
        <h1>Real-Time Crypto Prices</h1>
        <div className="container">
          <>
            {
              !isLoading && coins.length ? 
                coins.map((coin: coinInterface)  => (
                  <Button style={{margin: '5px'}} className="justify-between" key={coin._id} variant="primary" type="button" onClick={() => handleChangeCoin(coin.coin_id)}>{coin.name}</Button>
                ))
              : null
            }
            {
              !isLoading && coins.length && <Button style={{margin: '5px'}} className="justify-between" variant="primary" type="button" onClick={() => handleChangeCoin('All')}>Show all</Button>
            }
          </>
        </div>
        {
          !priceApiLoading && data.length ? 
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Price (INR)</th>
                  <th>Market cap</th>
                  <th>24 hour volume</th>
                  <th>24 hour change</th>
                  <th>Last change date</th>
                </tr>
              </thead>
              <tbody>
                {data.map((entry, index) => (
                  <tr key={index}>
                    <td>{entry.coin_id}</td>
                    <td>{entry.price}</td>
                    <td>{entry.market_cap}</td>
                    <td>{entry.h24_vol}</td>
                    <td>{entry.h24_change}</td>
                    <td>{new Date(entry.last_updated_at).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </Table> : null
        }
        
      </div>
    </>
  );
}

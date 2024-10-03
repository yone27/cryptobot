import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const CONTEXT = createContext();

export const PROVIDER = ({ children }) => {
  const TRADING_BOT = "Trading Bot";
  const [topTokens, setTopTokens] = useState([]);
  const [tradingCount, setTradingCount] = useState(0);
  const [loader, setLoader] = useState(false);
  let length;

  const LOAD_INITIAL_DATA = async () => {
    try {
      // const URL = "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3";
      const URL = "https://gateway.thegraph.com/api/f06130247d888e090911b1e1bdaaf322/subgraphs/id/5zvR82QoaXYFyDEKLZ9t6v9adgnptxYpKpSbxtgVENFV";
      const query = `
        {
          tokens(orderBy: volumeUSD, orderDirection: desc, first:20){
            id
            name
            symbol
            decimals
            volume
            volumeUSD
            totalSupply
            feesUSD
            txCount
            poolCount
            totalValueLockedUSD
            totalValueLocked
            derivedETH
          }
        }
      `;
      const axiosData = await axios.post(URL, { query },  {
        headers: {
          'Authorization': `Bearer f06130247d888e090911b1e1bdaaf322`
        }
      });
      setTopTokens(axiosData.data.data.tokens);
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    LOAD_INITIAL_DATA()
  }, [])
  

  const buyTokens = async () => {
    try {
    } catch (error) {}
  };
  const sellTokens = async () => {
    try {
    } catch (error) {}
  };

  const trading = async () => {
    try {
    } catch (error) {}
  };

  return (
    <CONTEXT.Provider
      value={{
        TRADING_BOT,
        trading,
        topTokens
      }}
    >
      {children}
    </CONTEXT.Provider>
  );
};

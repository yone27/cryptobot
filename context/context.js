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
      const URL =
        "https://gateway.thegraph.com/api/f06130247d888e090911b1e1bdaaf322/subgraphs/id/5zvR82QoaXYFyDEKLZ9t6v9adgnptxYpKpSbxtgVENFV";
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
      const axiosData = await axios.post(
        URL,
        { query },
        {
          headers: {
            Authorization: `Bearer f06130247d888e090911b1e1bdaaf322`
          }
        }
      );
      setTopTokens(axiosData.data.data.tokens);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    LOAD_INITIAL_DATA();
  }, []);

  const routerAddress = "0xE592427A0AEce92De3Edee1F18E0157C05861564"; // Uniswap Router
  const quoterAddress = "0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6"; // Uniswap Quoter

  const buyTokens = async (
    tokenAddress1,
    tokenAddress2,
    fee,
    addres,
    buyAmount,
    router
  ) => {
    const deadline = Math.floor(Date.now() / 1000) + 600;

    const transaction = router.excactInputSingle([
      tokenAddress1,
      tokenAddress2,
      fee,
      addres,
      deadline,
      buyAmount,
      0,
      0
    ]);

    transaction.wait();
    console.log(transaction.hash);

    return transaction.hash;
    try {
    } catch (error) {}
  };

  const sellTokens = async ({
    tokenAddress1,
    tokenAddress2,
    fe,
    userAddress,
    buyAmount,
    router,
    sellAmount,
    account
  }) => {
    try {
      const token = TOKEN(account, tokenAddress2);
      const allowance = await token.allowance(userAddress, routerAddress);
      console.log(`current allowance ${allowance}`);

      if (allowance < sellAmount) {
        console.log("Aproving spend (bulk approve in production)");
        const atx = await token.aprove(routerAddress.sellAmount);

        await atx.wait();
      }

      const deadline = Math.floor(Date.now() / 1000) + 600;
      const tx = await router.exactInputSingle([
        tokenAddress2,
        tokenAddress1,
        fee,
        userAddress,
        deadline,
        sellAmount,
        0,
        0
      ])
      await tx.wait()
      console.log(tx.hash)
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

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
    fee,
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
      ]);
      await tx.wait();
      console.log(tx.hash);
      return tx.hash;
    } catch (error) {}
  };

  const trading = async (activeNetwork, tradeToken) => {
    setLoader(true);
    try {
      // web
      const provider = new ethers.JsonRpcProvider(
        `${activeNetwork.rpcUrl}${activeNetwork.apiKey}`
      );
      const wallet = new ethers.Wallet(`0x${activeNetwork.privateKey}`);

      const buyAmount = ethers.parseUnits(tradeToken.buyAmount, "ether");
      const targetPrice = BigInt(tradeToken.targetPrice);
      const targetAmountOut = buyAmount * targetPrice;
      const sellAmount = buyAmount / targetPrice;

      const account = wallet.connect(provider);
      const token = TOKEN(account, tradeToken.tokenAddress2);
      const router = ROUTER(account);
      const quoter = QUOTER(account);

      // CHECK PRICE BEFORE TRADE
      const amountOut = await quoter.quoteExactInputSingle(
        tradeToken.tokenAddress1,
        tradeToken.tokenAddress2,
        tradeToken.fee * 1,
        buyAmount,
        0
      );

      console.log(amountOut);
      console.log(`Current exchange rate: ${amountOut.toString()}`);
      console.log(`Target exchange rate: ${targetAmountOut.toString()}`);

      let transactionHash;

      if (amountOut < targetAmountOut) {
        transactionHash = await buyAmount(
          tradeToken.tokenAddress1,
          tradeToken.tokenAddress2,
          tradeToken.fee * 1,
          wallet.addres,
          buyAmount,
          router
        );
      }

      const userAddress = activeNetwork.walletAddress
      if(amountOut > targetAmountOut) {
        transactionHash = await sellTokens(
          tradeToken.tokenAddress1,
          tradeToken.tokenAddress2,
          tradeToken.fee * 1,
          userAddress,
          buyAmount,
          router,
          sellAmount,
          account,
        )
      }

      // STORING DATA
      const liveTransaction = {
        currentRate: `${amountOut.toString()}`,
        targetRate: `${targetAmountOut.toString()}`,
        transactionHash: transactionHash,
      }

      let transactionArray = []

      const listTransaction = localStorage.getItem("LIVE_TRANSACTION")
      if(listTransaction) {
        transactionArray = JSON.parse(localStorage.getItem("LIVE_TRANSACTION"))
        transactionArray.push(liveTransaction)
        localStorage.setItem("LIVE_TRANSACTION", JSON.stringify(transactionArray))
      }else{
        transactionArray.push(liveTransaction)
        localStorage.setItem("LIVE_TRANSACTION", JSON.stringify(transactionArray))
      }

      setTradingCount(transactionArray.length + 1)
      console.log(transactionArray)
      setLoader(false)
    } catch (error) {}
  };

  return (
    <CONTEXT.Provider
      value={{
        TRADING_BOT,
        topTokens,
        trading,
        tradingCount,
        length,
        setTradingCount,
        setLoader,
        loader 
      }}
    >
      {children}
    </CONTEXT.Provider>
  );
};

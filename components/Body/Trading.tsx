import React, { useContext, useEffect, useState } from 'react'
import { CONTEXT } from "../../context/context";
import { notifySuccess } from '../../utils';
import { clearInterval } from 'timers';
import { FaRegCopy } from "react-icons/fa6"

export interface InterfaceNetworks {
  networkName: string,
  rpcUrl: string,
  apiKey: string,
  walletAddress: string,
  privateKey: string,
  image: string
}
export interface InterfaceToken {
  token1: string,
  token2: string,
  tokenAddress1: string,
  tokenAddress2: string,
  network: string,
  fee: string,
  buyAmount: string,
  targetPrice: string,
  message: string
}

const Trading = ({ setActiveComponent }) => {
  const {
    TRADING_BOT,
    topTokens,
    trading,
    tradingCount,
    length,
    setTradingCount,
    setLoader,
    loader
  } = useContext(CONTEXT);

  const [activeNetwork, setActiveNetwork] = useState<InterfaceNetworks>()
  const [tokens, setTokens] = useState()
  const [tradeToken, setTradeToken] = useState<InterfaceToken>()
  const [active, setActive] = useState(false)
  const [liveTransaction, setLiveTransaction] = useState([])
  const [userMembership, setUserMembership] = useState<string>()

  const tradeFrequency = 1000

  useEffect(() => {
    const tokenLists = JSON.parse(localStorage.getItem("setTokens"))
    const active = JSON.parse(localStorage.getItem("activeNetwork"))
    const tokenPair = JSON.parse(localStorage.getItem("tokenPair"))
    const user = localStorage.getItem("USER_MEMBERSHIP")

    setUserMembership(user)
    setActiveNetwork(active)
    setTokens(tokenLists)
    setTradeToken(tokenPair)
  }, [])

  const selectTokenPair = () => {
    localStorage.setItem("tokenPair", JSON.stringify(tradeToken))
  }

  useEffect(() => {
    if (active) {
      const yourFunction = () => {
        trading(activeNetwork, tradeToken)
        notifySuccess("transaction completed...")
        console.log("Function called every 1 minute")
      }

      const intervalId = setInterval(yourFunction, tradeFrequency)
      return () => clearInterval(intervalId)
    }
  }, [active])

  useEffect(() => {
    const listTransactions = JSON.parse(localStorage.getItem("LIVE_TRANSACTION"))
    setLiveTransaction(listTransactions)
  }, [tradingCount, length])

  const stopTrading = () => {
    setActive(false)
  }

  return (
    <div className="techwave_fn_content">
      <div className="techwave_fn_page">
        <div className="techwave_fn_user_profile_page">
          <div className="techwave_fn_pagetitle">
            <h2 className="title">Trading Crypto</h2>
          </div>

          <div className="container small">
            <div className="techwave_fn_user_profile">
              <div className="user__profile">
                <div className="user_aver">
                  <img src={activeNetwork?.image || "img/crypto.png"} alt="" />
                </div>

                <div className="user_details new_hide">
                  <ul>
                    <li>
                      <div className="item">
                        <h4 className="subtitle">Network</h4>
                        <h3 className="title">
                          {activeNetwork?.networkName || "Select"}
                        </h3>
                      </div>
                    </li>
                    <li>
                      <div className="item">
                        <h4 className="subtitle">Adress</h4>
                        <h3 className="title">
                          {activeNetwork?.walletAddress || "Select"}
                          <span onClick={() => navigator.clipboard.writeText(activeNetwork?.walletAddress)}>
                            <FaRegCopy />
                          </span>
                        </h3>
                      </div>
                    </li>

                    <li>
                      <div className="item">
                        <h4 className="subtitle">PrivateKey</h4>
                        <h3 className="title">
                          {activeNetwork?.privateKey || "Select"}
                          <span onClick={() => navigator.clipboard.writeText(activeNetwork?.privateKey)}>
                            <FaRegCopy />
                          </span>
                        </h3>
                      </div>
                    </li>

                    <li>
                      <div className="item">
                        <h4 className="subtitle">RPC URL</h4>
                        <h3 className="title">
                          {activeNetwork?.rpcUrl || "Select"}
                          <span onClick={() => navigator.clipboard.writeText(activeNetwork?.rpcUrl)}>
                            <FaRegCopy />
                          </span>
                        </h3>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="user__plan">
                <div className="plan_left">
                  <h4 className="subtitle">
                    TokenA
                  </h4>
                  <p className="info">
                    {tradeToken?.token1}
                  </p>
                </div>
                <div className="plan_left">
                  <h4 className="subtitle">
                    TokenB
                  </h4>
                  <p className="info">
                    {tradeToken?.token2}
                  </p>
                </div>
                <div className="plan_left">
                  <h4 className="subtitle">
                    Fee
                  </h4>
                  <p className="info">
                    {tradeToken?.fee}
                  </p>
                </div>
                <div className="plan_left">
                  <h4 className="subtitle">
                    Network
                  </h4>
                  <p className="info">
                    {tradeToken?.network}
                  </p>
                </div>
              </div>
              <div>
                {
                  userMembership !== "notMember" ? (
                    <>
                      {
                        active ? (
                          <a onClick={() => stopTrading()} className='techwave_fn_button'>Stop Bot</a>
                        ) : (
                          <a onClick={() => (trading(activeNetwork, tradeToken), setActive(true))} className='techwave_fn_button'>Start Trading</a>
                        )
                      }

                    </>
                  ) : (
                    <a onClick={() => (
                      setActiveComponent("Pricing")
                    )} className='techwave_fn_button'>Buy Membership</a>
                  )
                }
              </div>
            </div>
          </div>

          <div className="techwave_fn_pricing">
            <div className="container">
              <div className="pricing__tabs">
                <div className="pricing__tab active">
                  {/* mobile */}
                  {
                    !liveTransaction == null ? (
                      ""
                    ) : (
                      <div className="fn__mobile_pricing">
                        <div className="pricing_item">
                          <div className="pricing__item_holder">
                            <div className="pricing__item__heading">
                              <h2 className="title">Live transaction...</h2>
                            </div>
                            {
                              liveTransaction?.map((transaction, index) => (
                                <div key={index} className='pricing__item_list'>
                                  <div className="pricing__item_list_item">
                                    <h4 className="title">
                                      {index + 1}. T_Amt:
                                      {transaction.targetRate}
                                    </h4>
                                    <p className='desc'>
                                    C_Amt: {transaction.currentRate}
                                    </p>
                                  </div>
                                </div>
                              ))
                            }
                          </div>
                        </div>
                      </div>
                    )
                  }

                  {
                    liveTransaction == null ? (
                      ""
                    ) : (
                      <div className="pricing__content">
                        <div className="pricing__heading">
                          <div className="item">
                            <span className="title">Live transaction...</span>
                          </div>
                          <div className="item wide"></div>
                        </div>

                        {
                          liveTransaction?.map((transation, index) => (
                            <div key={index} className='pricing__fields'>
                              <div className="new_flex">
                                <div className="item_col">
                                  <span className="heading_text">
                                    {index + 1} T_Amount:
                                    {transation.targetRate}
                                  </span>
                                </div>
                                <div className="item_col">
                                  <span className="option_text">
                                    {index + 1} C_Amount:
                                    {transation.currentRate}
                                  </span>
                                </div>
                                <div className="item_col">
                                  <span className="option_text" onClick={() => navigator.clipboard.writeText(transation.transactionHash)}>
                                    {index + 1} Hash:
                                    {transation.transactionHash}
                                    <FaRegCopy />
                                  </span>
                                </div>
                              </div>

                            </div>
                          ))
                        }
                      </div>
                    )
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Trading
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";

// INTERNAL IMPORT
import { AddTokenPair, Header, Home, Login, Networks, Preloader, Price, Profile, Search, Setting, SideBar, Signup, TopExchangeTokens, TradeTokens, Trading } from "../components";
import { CONTEXT } from "../context/context";
import axios from "axios";

const index = () => {
  const { TRADING_BOT } = useContext(CONTEXT);

  const [activeComponent, setActiveComponent] = useState("Home");
  const [membershipTYpe, setMembershipTYpe] = useState("Premiun");
  const [authBackEndId, setAuthBackEndId] = useState("");

  const [networks, setNetworks] = useState({});
  const [networkName, setNetworkName] = useState("");

  // NOTIFICATION
  const notifyError = (msg) => toast.error(msg, { duration: 2000 });
  const notifySuccess = (msg) => toast.success(msg, { duration: 2000 });

  return (
    <div>
      {/* <MovingSubmenu /> */}
      <Preloader />

      {activeComponent === "Signup" && (
        <Signup
          axios={axios}
          setActiveComponent={setActiveComponent}
          notifyError={notifyError}
          notifySuccess={notifySuccess}
        />
      ) }

      {activeComponent == "Login" ? (
        <Login
          setActiveComponent={setActiveComponent}
          axios={axios}
          notifyError={notifyError}
          notifySuccess={notifySuccess}
        />
      ) : (
        <div className='techwave_fn_wrapper'>
          <div className='techawave_fn_wrap'>
            <Search />
            <Header
              networkName={networkName}
              setActiveComponent={setActiveComponent}
            />
            <SideBar 
          setActiveComponent={setActiveComponent}
            />
            {
              activeComponent === "Home" ? (
                <Home />
              ): activeComponent === "Trade Tokens" ? (
                <TradeTokens />
              ): activeComponent === "Top Echange Tokens" ? (
                <TopExchangeTokens />
              ): activeComponent === "Networks" ? (
                <Networks networkName={networkName} />
              ): activeComponent === "Trading" ? (
                <Trading axios={axios}  /> 
              ): activeComponent === "Pricing" ? (
                <Price />
              ): activeComponent === "Profile" ? (
                <Profile setActiveComponent={setActiveComponent} />
              ): activeComponent === "Setting" ? (
                <Setting />
              ): activeComponent === "Add Token Pair" ? (
                <AddTokenPair /> 
              ): null
            }
          </div>
        </div>
      )}
    </div>
  );
};

export default index;

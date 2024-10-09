import React, { useContext, useState } from "react";
import toast from "react-hot-toast";

// INTERNAL IMPORT
import {
  AddNetwork,
  AddTokenPair,
  Header,
  Home,
  Login,
  Networks,
  Preloader,
  Price,
  Profile,
  Search,
  Setting,
  SideBar,
  Signup,
  TopExchangeTokens,
  TradeTokens,
  Trading
} from "../components";

const index = () => {
  const [activeComponent, setActiveComponent] = useState("Home");
  const [membershipTYpe, setMembershipTYpe] = useState("Premiun");
  const [authBackEndId, setAuthBackEndId] = useState("");

  const [networks, setNetworks] = useState({});
  const [networkName, setNetworkName] = useState("");

  return (
    <div>
      {/* <MovingSubmenu /> */}
      <Preloader />

      {activeComponent === "Signup" && (
        <Signup
          setActiveComponent={setActiveComponent}
        />
      )}

      {activeComponent === "Login" ? (
        <Signup
          setActiveComponent={setActiveComponent}
        />
      ) : (
        <div className='techwave_fn_wrapper'>
          <div className='techawave_fn_wrap'>
            <Search />
            <Header
              networkName={networkName}
              setActiveComponent={setActiveComponent}
            />
            <SideBar setActiveComponent={setActiveComponent} />
            {activeComponent === "Home" ? (
              <Home />
            ) : activeComponent === "Trade Tokens" ? (
              <TradeTokens />
            ) : activeComponent === "Top Exchange Tokens" ? (
              <TopExchangeTokens />
            ) : activeComponent === "Networks" ? (
              <Networks
                networkName={networkName}
                setNetworkName={setNetworkName}
              />
            ) : activeComponent === "Add Network" ? (
              <AddNetwork />
            ) : activeComponent === "Trading" ? (
              <Trading setActiveComponent={setActiveComponent} />
            ) : activeComponent === "Pricing" ? (
              <Price />
            ) : activeComponent === "Profile" ? (
              <Profile setActiveComponent={setActiveComponent} />
            ) : activeComponent === "Setting" ? (
              <Setting />
            ) : activeComponent === "Add Token Pair" ? (
              <AddTokenPair />
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default index;

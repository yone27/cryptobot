import React, { useEffect, useState } from "react";
import { FaRegCopy } from "react-icons/fa6";
import { notifySuccess } from "../../utils";
import Footer from "../Global/Footer";

const Networks = () => {
  const [networks, setNetworks] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const [activeNetwork, setActiveNetwork] = useState({});
  const [active, setActive] = useState();

  // calling hook
  useEffect(() => {
    const networksLists = JSON.parse(localStorage.getItem("setNetworks"));
    setNetworks(networksLists);

    const user = JSON.parse(localStorage.getItem("userProfile"));
    setUserDetails(user);
  }, []);

  const selectNetwork = () => {
    localStorage.setItem("activeNetwork", JSON.stringify(activeNetwork));
  };

  return (
    <div className='techwave_fn_content'>
      <div className='techwave_fn_page'>
        <div className='techwave_fn_models_page'>
          <div className='container'>
            <div className='models__content'>
              <div className='models__results'>
                <div className='fn__tabs_content'>
                  <div className='tab__item active' id='tab1'>
                    <ul className='fn__model_items'>
                      {networks?.map((network, index) => (
                        <li
                          onClick={() => (
                            setActiveNetwork(network),
                            selectNetwork(),
                            // setNetworkName(network?.networkName),
                            notifySuccess(network?.networkName)
                          )}
                          key={index + 1}
                          className={`fn__model_item`}
                        >
                          <div
                            className='item'
                            onClick={() => setActive(index + 1)}
                          >
                            <div className='img'>
                              <img src={network.image} alt='logo' />
                            </div>
                            <div className='item__info'>
                              <h3 className='title'>{network?.networkName}</h3>
                              <p className='desc'>
                                Your wallet details is private to you, address
                                add
                                <span
                                  onClick={() =>
                                    navigator.clipboard.writeText(
                                      network?.privateKey
                                    )
                                  }
                                >
                                  privateKey <FaRegCopy />
                                </span>
                              </p>
                            </div>

                            <div className='item__author'>
                              <img
                                src={userDetails?.image || "img/crypto.png"}
                                alt='imagen'
                              />
                              <h3
                                className='author_name'
                                onClick={() =>
                                  navigator.clipboard.writeText(
                                    network?.walletAddress
                                  )
                                }
                              >
                                {userDetails?.name || "Update Name"}
                                <FaRegCopy />
                              </h3>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Networks;

import React, { useState } from "react";
import { notifyError, notifySuccess } from "../../utils";

const AddTokenPair = () => {
  const [token, setToken] = useState({
    token1: "",
    token2: "",
    tokenAddress1: "",
    tokenAddress2: "",
    network: "",
    fee: "",
    buyAmount: "",
    targetPrice: "",
    message: ""
  });

  const handleFormFieldChange = (e) => {
    setToken({ ...token, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requiredFields = ['token1', 'token2', 'tokenAddress1', 'tokenAddress2', 'network', 'fee'];
    const temporalToken = Object.fromEntries(requiredFields.map(field => [field, token[field]]));

    if (Object.values(temporalToken).some((value) => value === "")) {
      return notifyError("Please provide all data.");
    }

    let tokenArray = []
    const tokenLists = localStorage.getItem("setTokens")
    if(tokenLists) {
      tokenArray = JSON.parse(localStorage.getItem("setTokens"))
      tokenArray.push(token)
      localStorage.setItem("setTokens", JSON.stringify(tokenArray))
      notifySuccess("Token add successfully")
      // window.location.reload()
    }else{
      tokenArray.push(token)
      localStorage.setItem("setTokens", JSON.stringify(tokenArray))
      notifySuccess("Token add successfully")
    }
  };

  return <div className="techwave_fn_content">
    <div className="techwave_fn_page">
      <div className="techwave_fn_contact_page">
        <div className="techwave_fn_pagetitle">
          <h2 className="h2"> Add Trading Tokens</h2>
        </div>

        <div className="contactpage">
          <div className="container small">
            <div className="fn_contact_from">
              <form className="contact_form" onSubmit={handleSubmit}>
                <div className="input_list">
                  <ul>
                    <li>
                      <input type="text" name="token1" placeholder="Native Token Name 1" onChange={(e => handleFormFieldChange(e) )} />
                    </li>
                    <li>
                      <input type="text" name="tokenAddress1" placeholder="Native Token Address" onChange={(e => handleFormFieldChange(e) )} />
                    </li>
                    <li>
                      <input type="text" name="token2" placeholder="Native Token Name 2" onChange={(e => handleFormFieldChange(e) )} />
                    </li>
                    <li>
                      <input type="text" name="tokenAddress2" placeholder="Native Token Address 2" onChange={(e => handleFormFieldChange(e) )} />
                    </li>
                    <li>
                      <input type="text" name="fee" placeholder="fee" onChange={(e => handleFormFieldChange(e) )} />
                    </li>
                    <li>
                      <input type="text" name="network" placeholder="Network name" onChange={(e => handleFormFieldChange(e) )} />
                    </li>
                    <li>
                      <input type="text" name="buyAmount" placeholder="Buy amount" onChange={(e => handleFormFieldChange(e) )} />
                    </li>
                    <li>
                      <input type="text" name="targetPrice" placeholder="Target price" onChange={(e => handleFormFieldChange(e) )} />
                    </li>
                    <li>
                      <input type="text" name="message" placeholder="Message" onChange={(e => handleFormFieldChange(e) )} />
                    </li>
                    <li>
                      <button className="techwave_fn_button">
                        <span>Save Token</span>
                      </button>
                    </li>
                  </ul>
                </div>
                <div className="returnmessage" data-success="Thanks for submitting the form  "> </div>
              </form>
            </div>
            <div className="fn__space__30"></div>
            <hr data-h="2" />
            <div className="fn__space__10"></div>
            <p>
              Kindly add your token which you want to use for automating trading  
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>;
};

export default AddTokenPair;

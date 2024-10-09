import React from 'react'

const Price = () => {

  return (
    <div className='techwave_fn_content'>
      <div className="techwave_fn_page">
        <div className="techwave_fn_pricing_page">
          <div className="techwave_fn_pricing">
            <div className="container">
              <div className="pricing__tabs">
                <div className="pricing__tab active">
                  {/* ONLY MOBILE DEVICES */}
                  <div className="fn__mobile_pricing">
                    {/* 1 */}
                    <div className="pricing__item">
                      <div className="pricing__item_holder">
                        <div className="pricing__item__header">
                          <h2 className='title'>
                            Personal
                          </h2>
                          <h3 className='price'>
                            <span>$10</span>/month
                          </h3>
                          <p className="desc">
                            billed yearly
                            <br />
                            <span>$15</span> billed monthly
                          </p>
                          <p className="purchase">
                            <a className='techwave_fn_button' onClick={() => { }}>buy personal</a>
                          </p>
                        </div>

                        <div className="pricing__item__heading">
                          <h2 className="title">Main Features</h2>
                        </div>

                        <div className="pricing__item_list">
                          {["Crypto", "Dh Tokens", "Running bot", "matic trading", "Any exchange trade", "Unlimited data"].map((item, index) => (
                            <div className="pricing__item_list_item">
                              <h4 className="title">{item}</h4>
                              <p className="desc">20, {index + 1}</p> 00
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    {/* 2 */}
                    <div className="pricing__item">
                      <div className="pricing__item_holder">
                        <div className="popular">
                          <span>Most popular</span>
                        </div>
                        <div className="pricing__item__header">
                          <h2 className='title'>
                            Premiun
                          </h2>
                          <h3 className='price'>
                            <span>$10</span>/month
                          </h3>
                          <p className="desc">
                            billed yearly
                            <br />
                            <span>$15</span> billed monthly
                          </p>
                          <p className="purchase">
                            <a className='techwave_fn_button' onClick={() => { }}>buy Premiun</a>
                          </p>
                        </div>

                        <div className="pricing__item__heading">
                          <h2 className="title">Main Features</h2>
                        </div>

                        <div className="pricing__item_list">
                          {["Crypto", "Dh Tokens", "Running bot", "matic trading", "Any exchange trade", "Unlimited data"].map((item, index) => (
                            <div className="pricing__item_list_item">
                              <h4 className="title">{item}</h4>
                              <p className="desc">20, {index + 1}</p> 00
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    {/* 3 */}
                    <div className="pricing__item">
                      <div className="pricing__item_holder">
                        <div className="pricing__item__header">
                          <h2 className='title'>
                            Enterprise
                          </h2>
                          <h3 className='price'>
                            <span>$15</span>/month
                          </h3>
                          <p className="desc">
                            billed yearly
                            <br />
                            <span>$35</span> billed monthly
                          </p>
                          <p className="purchase">
                            <a className='techwave_fn_button' onClick={() => { }}>buy Enterprise</a>
                          </p>
                        </div>

                        <div className="pricing__item__heading">
                          <h2 className="title">Main Features</h2>
                        </div>

                        <div className="pricing__item_list">
                          {["Crypto", "Dh Tokens", "Running bot", "matic trading", "Any exchange trade", "Unlimited data"].map((item, index) => (
                            <div className="pricing__item_list_item">
                              <h4 className="title">{item}</h4>
                              <p className="desc">20, {index + 1}</p> 00
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                  </div>
                  {/* DESKTOP */}
                  <div className="pricing__content">
                    <div className="pricing__header">
                      <div className="item_row">
                        <div className="item_col"></div>
                        {/* 1 */}
                        <div className="item_col">
                          <h2 className="title">
                            Personal
                          </h2>
                          <h3 className="price">
                            <span>5 matic</span> / month
                          </h3>
                          <p className="desc">
                            Limited trading
                            <br />
                            <span>25</span> trading monthly
                          </p>
                          <p className="purchase">
                            <a onClick={() => { }} className='techwave_fn_button'>Buy personal</a>
                          </p>
                        </div>
                        {/* 2 */}
                        <div className="item_col">
                          <div className="popular">
                            <span>Most popular</span>
                          </div>
                          <h2 className="title">
                            Premiun
                          </h2>
                          <h3 className="price">
                            <span>5 matic</span> / month
                          </h3>
                          <p className="desc">
                            Limited trading
                            <br />
                            <span>25</span> trading monthly
                          </p>
                          <p className="purchase">
                            <a onClick={() => { }} className='techwave_fn_button'>Buy Premiun</a>
                          </p>
                        </div>
                        {/* 3 */}
                        <div className="item_col">
                          <h2 className="title">
                            Enterprise
                          </h2>
                          <h3 className="price">
                            <span>5 matic</span> / month
                          </h3>
                          <p className="desc">
                            Limited trading
                            <br />
                            <span>25</span> trading monthly
                          </p>
                          <p className="purchase">
                            <a onClick={() => { }} className='techwave_fn_button'>Buy Enterprise</a>
                          </p>
                        </div>
                      </div>
                    </div>


                    <div className="pricing__heading">
                      <div className="item">
                        <span className="title">Main Features</span>
                      </div>
                      <div className="item wide"></div>
                    </div>

                    <div className="pricing__fields">
                      {["Crypto", "Dh Tokens", "Running bot", "matic trading", "Any exchange trade", "Unlimited data"].map((item, index) => (
                        <div className="item_row">
                          <div className="item_col">
                            <span className="heading_text">
                              {item}
                            </span>
                          </div>
                          <div className="item_col">
                            <span className="heading_text">
                              5, {index + 1}00
                            </span>
                          </div>
                          <div className="item_col">
                            <span className="heading_text">
                              5, {index + 4}00
                            </span>
                          </div>
                          <div className="item_col">
                            <span className="heading_text">
                              5, {index + 6}00
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Price
import React, { useContext, useEffect, useState } from "react";
import { CONTEXT } from "../../context/context";
import { FaRegCopy } from "react-icons/fa6";
import Footer from "../Global/Footer";

const TopExchangeTokens = () => {
  const { topTokens } = useContext(CONTEXT);

  // STATE VARIABLE
  const [search, setSearch] = useState("");
  const [searchItem, setSearchItem] = useState(search);
  const [tokens, setTokens] = useState(topTokens);
  const [copyTokens, ] = useState(topTokens);

  const onHandleSearch = (value) => {
    const filterToken = tokens?.filter(({ name }) =>
      name.toLowerCase().includes(value.toLowerCase())
    );

    if (filterToken?.length === 0) {
      setTokens(copyTokens);
    } else {
      setTokens(filterToken);
    }
  };

  const onClearSearch = () => {
    if (tokens?.length && copyTokens?.length) {
      setTokens(copyTokens);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setSearch(searchItem), 1000);

    return () => clearTimeout(timer);
  }, [searchItem]);

  useEffect(() => {
    if (search) {
      onHandleSearch(search);
    } else {
      onClearSearch();
    }
  }, [search]);

  return (
    <div className='techwave_fn_content'>
      <div className='techwave_fn_page'>
        <div className='techwave_fn_comunity_page'>
          <div className='fn__title_holder'>
            <div className='container'>
              <h1 className='title'>Top Tokens</h1>
            </div>
          </div>

          <div className='techwave_fn_feed'>
            <div className='container'>
              <div className='feed__filter'>
                <div className='filter__search'>
                  <input
                    type='text'
                    className='Search token...'
                    onChange={(e) => setSearchItem(e.target.value)}
                    value={searchItem}
                  />
                  <a href='#' className='techwave_fn_button'>
                    <span>Search</span>
                  </a>
                </div>
              </div>
            </div>

            <div className='techwave_fn_pricing'>
              <div className='container'>
                <div className='pricing__tabs'>
                  <div className='pricing__tab active'>
                    <div className='fn__mobile_pricing'>
                      <div className='pricing__item'>
                        <div className='pricing__item_holder'>
                          <div className='pricing__item__heading'>
                            <h2 className='title'>Top 20 toknes</h2>
                          </div>

                          <div className='pricing__item_list'>
                            {tokens?.map((token, index) => (
                              <div
                                key={index}
                                className='pricing__item_list_item'
                              >
                                <h4
                                  className='title'
                                  onClick={() =>
                                    navigator.clipboard.writeText(token.id)
                                  }
                                >
                                  {token.name} &nbsp; &nbsp;
                                  <FaRegCopy />
                                </h4>
                                <p className='desc'>{token.totalSupply}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* desktop */}
                    <div className='pricing__content'>
                      <div className='pricing_heading'>
                        <div className='item'>
                          <span className='title'>Top 20 tokens</span>
                        </div>
                        <div className='item wide'></div>
                      </div>
                      <div className='pricing__fields'>
                        {tokens?.map((token, index) => (
                          <div className='item_row' key={token.id}>
                            <div
                              onClick={() =>
                                navigator.clipboard.writeText(token.id)
                              }
                              className='item_col'
                            >
                              <span className='heading_text'>
                                {token?.name.slice(0, 12)}
                                &nbsp; &nbsp;
                                <FaRegCopy />
                              </span>
                            </div>

                            <div className='item_col'>
                              <span className='option_text'>
                                {token.totalSupply}
                              </span>
                            </div>

                            <div className='item_col'>
                              <span className='option_text'>
                                {token.totalValueLocked.slice(0, 12)}
                              </span>
                            </div>

                            <div className='item_col'>
                              <span className='option_text'>
                                {token.symbol}
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
      <Footer />
    </div>
  );
};

export default TopExchangeTokens;

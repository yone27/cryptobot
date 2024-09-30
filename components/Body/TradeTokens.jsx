import React from "react";

const TradeTokens = () => {
  const [search, setSearch] = useState("");
  const [searchItem, setSearchItem] = useState(search);
  const [tokens, setTokens] = useState([]);
  const [copyTokens, setCopyTokens] = useState([]);
  const [tradeToken, setTradeToken] = useState({});
  const [active, setActive] = useState();

  useEffect(() => {
    const tokensLists = JSON.parse(localStorage.getItem("setTokens"));

    setTradeToken(JSON.parse(localStorage.getItem("tokenPair")));
    setTokens(tokensLists);
    setCopyTokens(tokensLists);

    console.log(tokensLists);
  }, []);

  const onHandleSearch = (value) => {
    const filterToken = tokens?.filter(({ network }) =>
      network.toLowerCase().includes(value.toLowerCase())
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
    if(search) {
      onHandleSearch(search)
    }else{
      onClearSearch()
    }
  }, [search]);

  const selectTokenPair = () => {
    localStorage.setItem("tokenPair", JSON.stringify(tradeToken))
  }

  return <div>TradeTokens</div>;
};

export default TradeTokens;

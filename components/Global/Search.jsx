import React from "react";

const Search = () => {
  return (
    <div className='techwave_fn_searchbar'>
      <div className='search__bar'>
        <input
          type='text'
          className='search__input'
          placeholder='search here'
        />

        <img
          src='img/lighticon/light-5.png'
          alt='logo'
          className='fn__svg search__icon'
        />

        <span className='search__closer'>
          <img
            src='img/lighticon/light-18.png'
            alt='lgoo'
            className='fn__svg'
          />
        </span>
      </div>

      <div className='seach__results'>
        <div className='results__title'>Results</div>
        <div className='results__list'>
          <ul>
            <li>
              <a href='#'>Artificial Intelligence</a>
            </li>
            <li>
              <a href='#'>Learn about the impace of AI crypto traing bot</a>
            </li>
            <li>
              <a href='#'>Welcome to the deveolper guide</a>
            </li>
            <li>
              <a href='#'>Artificial Intelligence</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Search;

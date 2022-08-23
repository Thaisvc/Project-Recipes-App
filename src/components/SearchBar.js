import React from 'react';

function SearchBar() {
  return (
    <div>
      <h3>Search Bar</h3>
      <input type="text" data-testid="search-input" />
      <label htmlFor="radioInput">
        <div>
          <input
            type="radio"
            name="radioInput"
            data-testid="ingredient-search-radio"
          />
          Ingredient
        </div>
        <div>
          <input
            type="radio"
            name="radioInput"
            data-testid="name-search-radio"
          />
          Name
        </div>
        <div>
          <input
            type="radio"
            name="radioInput"
            data-testid="first-letter-search-radio"
          />
          First Letter
        </div>
      </label>
      <div>
        <button
          type="button"
          data-testid="exec-search-btn"
        >
          SEARCH
        </button>
      </div>
    </div>
  );
}

export default SearchBar;

import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';

function SearchBar() {
  // const [search, setSearch] = useState();

  function handleChecked({ target }) {
    const value = target.type === 'radio' ? target.checked : target.value;
    console.log(value);
    // setSearch(value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(search);
  }

  return (
    <div>
      <h3>Search Bar</h3>
      <form onSubmit={ handleSubmit }>
        <input
          name="search"
          type="text"
          data-testid="search-input"
          onChange={ (e) => handleChecked(e) }
        />
        <label htmlFor="radioInput">
          <div>
            <input
              type="radio"
              name="radioInput"
              data-testid="ingredient-search-radio"
              onChange={ (e) => handleChecked(e) }
            />
            Ingredient
          </div>
          <div>
            <input
              type="radio"
              name="radioInput"
              data-testid="name-search-radio"
              onChange={ (e) => handleChecked(e) }
            />
            Name
          </div>
          <div>
            <input
              type="radio"
              name="radioInput"
              data-testid="first-letter-search-radio"
              onChange={ (e) => handleChecked(e) }
            />
            First Letter
          </div>
        </label>
        <div>
          <button
            type="submit"
            data-testid="exec-search-btn"

          >
            SEARCH
          </button>
        </div>
      </form>
    </div>
  );
}

export default SearchBar;

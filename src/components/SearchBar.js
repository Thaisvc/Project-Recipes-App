import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';

function SearchBar() {
  const { setNameInput, setRadioInput,
    nameInput, radioInput, getRevenue } = useContext(RecipesContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nameInput.length > 1 && radioInput === 'First Letter') {
      global.alert('Your search must have only 1 (one) character');
    } else {
      getRevenue(nameInput, radioInput);
    }
  };

  return (
    <div>
      <h3>Search Bar</h3>
      <form onSubmit={ handleSubmit }>
        <input
          name="search"
          type="text"
          data-testid="search-input"
          onChange={ ({ target: { value } }) => setNameInput(value) }
        />
        <label
          htmlFor="radioInput"
          onChange={ ({ target: { value } }) => setRadioInput(value) }
        >
          <div>
            <input
              type="radio"
              value="Ingredient"
              name="radioInput"
              data-testid="ingredient-search-radio"
            />
            Ingredient
          </div>
          <div>
            <input
              type="radio"
              value="Name"
              name="radioInput"
              data-testid="name-search-radio"
            />
            Name
          </div>
          <div>
            <input
              type="radio"
              value="First Letter"
              name="radioInput"
              data-testid="first-letter-search-radio"
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

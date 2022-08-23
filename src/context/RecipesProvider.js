import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';
import { Foods, Drinks } from '../SearchFoodDrink';

function RecipesProvider({ children }) {
  const [titlePage, setTitlePage] = useState('Foods');
  const [disabledSearch, setDisabledSearch] = useState(false);
  const [nameInput, setNameInput] = useState('');
  const [radioInput, setRadioInput] = useState('');
  /* const [searchName, setSearchName] = useState('');
  const [searchCateg, setSearchCateg] = useState(''); */
  const history = useHistory();

  const getRevenue = (searchA, searchB) => {
    const { pathname } = history.location;
    if (pathname === '/foods') {
      Foods(searchA, searchB);
    } else if (pathname === '/drinks') {
      Drinks(searchA, searchB);
    }
  };

  const objContext = {
    disabledSearch,
    titlePage,
    nameInput,
    radioInput,
    setDisabledSearch,
    setTitlePage,
    setNameInput,
    setRadioInput,
    getRevenue,

  };
  return (
    <RecipesContext.Provider value={ objContext }>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default RecipesProvider;

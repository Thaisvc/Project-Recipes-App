import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';
import ProfileImg from '../images/profileIcon.svg';
import SearchImg from '../images/searchIcon.svg';

function Header() {
  const { titlePage } = useContext(RecipesContext);
  return (
    <div>
      <h1 data-testid="page-title">{titlePage}</h1>
      <img
        src={ ProfileImg }
        alt="Profile Icon"
        data-testid="profile-top-btn"
      />
      {(titlePage !== 'Profile'
      && titlePage !== 'Done Recipes'
      && titlePage !== 'Favorite Recipes')
        ? (
          <img
            src={ SearchImg }
            alt="Search Icon"
            data-testid="search-top-btn"
          />
        ) : ''}
    </div>
  );
}

export default Header;

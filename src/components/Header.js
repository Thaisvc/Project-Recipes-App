import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import ProfileImg from '../images/profileIcon.svg';
import SearchImg from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import './Header.css';

function Header() {
  const { titlePage, setDisabledSearch, disabledSearch } = useContext(RecipesContext);
  return (
    <div className="contener_header">
      <Link to="/profile">
        <img
          src={ ProfileImg }
          alt="Profile Icon"
          data-testid="profile-top-btn"
        />
      </Link>
      <h1 data-testid="page-title">{titlePage}</h1>
      {(titlePage !== 'Profile'
      && titlePage !== 'Done Recipes'
      && titlePage !== 'Favorite Recipes')
        ? (
          <div>
            <button
              style={ { border: 'none', backgroundColor: '#ec4f37', cursor: 'pointer' } }
              type="button"
              onClick={ () => setDisabledSearch(!disabledSearch) }
            >
              <img
                className="img_header"
                data-testid="search-top-btn"
                aria-label="Search Icon"
                src={ SearchImg }
                alt="Search Icon"
              />
            </button>
            {disabledSearch && <SearchBar />}
          </div>
        ) : ''}
    </div>
  );
}

export default Header;

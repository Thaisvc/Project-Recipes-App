import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';

function Favorites() {
  const { setTitlePage } = useContext(RecipesContext);
  useEffect(() => {
    setTitlePage('Favorite Recipes');
  }, [setTitlePage]);
  return (
    <div>
      <Header />
    </div>
  );
}

export default Favorites;

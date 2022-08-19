import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';

function DoneRecipes() {
  const { setTitlePage } = useContext(RecipesContext);
  useEffect(() => {
    setTitlePage('Done Recipes');
  }, [setTitlePage]);
  return (
    <div>
      <Header />
    </div>
  );
}

export default DoneRecipes;

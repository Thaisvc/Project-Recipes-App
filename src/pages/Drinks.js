import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';

function Drinks() {
  const { setTitlePage } = useContext(RecipesContext);
  useEffect(() => {
    setTitlePage('Drinks');
  }, [setTitlePage]);
  return (
    <div>
      <Header />
    </div>
  );
}

export default Drinks;

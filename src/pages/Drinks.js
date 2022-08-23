import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
import RecipesContext from '../context/RecipesContext';
import Footer from '../components/Footer';

function Drinks() {
  const { setTitlePage } = useContext(RecipesContext);
  useEffect(() => {
    setTitlePage('Drinks');
  }, [setTitlePage]);
  return (
    <div>
      <Header />
      <Recipes />
      <Footer />
    </div>
  );
}

export default Drinks;

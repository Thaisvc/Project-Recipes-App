import React, { useContext, useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
import RecipesContext from '../context/RecipesContext';

function Foods() {
  const { setTitlePage } = useContext(RecipesContext);
  useEffect(() => {
    setTitlePage('Foods');
  }, [setTitlePage]);
  return (
    <div>
      <Header />
      <Recipes />
      <Footer />
    </div>
  );
}

export default Foods;

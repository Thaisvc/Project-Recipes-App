import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';
import Footer from '../components/Footer';

function Profile() {
  const { setTitlePage } = useContext(RecipesContext);
  useEffect(() => {
    setTitlePage('Profile');
  }, [setTitlePage]);
  return (
    <div>
      <Header />
      <Footer />
    </div>
  );
}

export default Profile;

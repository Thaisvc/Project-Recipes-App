import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';

function Profile() {
  const { setTitlePage } = useContext(RecipesContext);
  useEffect(() => {
    setTitlePage('Profile');
  }, [setTitlePage]);
  return (
    <div>
      <Header />
    </div>
  );
}

export default Profile;

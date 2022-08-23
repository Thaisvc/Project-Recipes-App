import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';

function Profile() {
  const [email, setEmail] = useState('');
  const emailStorage = () => {
    const getEmail = JSON.parse(localStorage.getItem('user'));
    setEmail(getEmail.email);
  };
  const { setTitlePage } = useContext(RecipesContext);
  useEffect(() => {
    emailStorage();
    setTitlePage('Profile');
  }, [setTitlePage]);
  return (
    <div>
      <Header />
      <p data-testid="profile-email">{ email }</p>
      <Link to="/done-recipes">
        <button type="button" data-testid="profile-done-btn">Done Recipes</button>
      </Link>
      <Link to="/favorite-recipes">
        <button type="button" data-testid="profile-favorite-btn">Favorite Recipes</button>
      </Link>
      <button type="button" data-testid="profile-logout-btn">Logout</button>
    </div>
  );
}

export default Profile;

import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';

function Profile() {
  const { setTitlePage } = useContext(RecipesContext);
  const [email, setEmail] = useState('');
  // função emailStorage que pega o user armazenado e insere no estado do profile (req58).
  const emailStorage = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    setEmail(user.email);
  };
  // função que limpa todas as chaves do localStorage (req62)
  const clearStorage = () => {
    localStorage.clear();
  };

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
      <Link to="/">
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ clearStorage }
        >
          Logout
        </button>
      </Link>
    </div>
  );
}

export default Profile;

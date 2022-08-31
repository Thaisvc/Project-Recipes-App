import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';
import Footer from '../components/Footer';
import './Profile.css';

function Profile() {
  const { setTitlePage } = useContext(RecipesContext);
  const [email, setEmail] = useState('');
  // Requisito 58 - Função emailStorage que pega o user armazenado e insere no estado do profile
  const emailStorage = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user !== null) {
      setEmail(user.email);
    }
  };
  // Requisito 62 - Função que limpa todas as chaves do localStorage
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
      <Footer />
      <p data-testid="profile-email" className="email-user">{ email }</p>
      {/* Requisito 59 - Implementando 3 botões "Done Recipes", "Favorite Recipes" e "Logout" */}
      {/* Requisito 60 - Botão Done Recipes que redireciona para a rota "/done-recipes" */}
      <div className="profile-buttons">
        <Link to="/done-recipes">
          <button
            type="button"
            data-testid="profile-done-btn"
            className="button-done"
          >
            Done Recipes
          </button>
        </Link>
        {/* Requisito 61 - Botão Favorite Recipes que redireciona para a rota "/favorite-recipes" */}
        <Link to="/favorite-recipes">
          <button
            type="button"
            data-testid="profile-favorite-btn"
            className="button-favorite"
          >
            Favorite Recipes
          </button>
        </Link>
        {/* Requisito 62 - Botão Logout que redireciona para a rota "/" */}
        <Link to="/">
          <button
            type="button"
            data-testid="profile-logout-btn"
            onClick={ clearStorage }
            className="button-logout"
          >
            Logout
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Profile;

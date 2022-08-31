import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import './Login.css';

function Login() {
  const { email,
    setEmail, setPassword, isDisabled } = useContext(RecipesContext);

  const history = useHistory();
  const handleClickButton = (event) => {
    event.preventDefault();
    // const userLogin = localStorage.getItem('user');
    const objToLocal = {
      email,
    };
    localStorage.setItem('user', JSON.stringify(objToLocal));
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    history.push('/foods');
  };

  return (
    <form className="form-class">
      <div className="login-class">
        <div className="h1-class">
          <h1>Recipes App</h1>
        </div>
        <label htmlFor="email-id">
          Email
          <input
            className="email-input-class"
            data-testid="email-input"
            type="email"
            placeholder="*Email (exemplo@gmail.com)"
            id="email-id"
            onChange={ (event) => setEmail(event.target.value) }
          />
        </label>
        <label htmlFor="password-id">
          Senha
          <input
            className="pass-input-class"
            data-testid="password-input"
            type="password"
            placeholder="*Password (More than six letters)"
            id="password-id"
            onChange={ (event) => setPassword(event.target.value) }
          />
        </label>
        <button
          disabled={ isDisabled }
          type="submit"
          data-testid="login-submit-btn"
          onClick={ handleClickButton }
        >
          Enter
        </button>
      </div>
    </form>
  );
}

export default Login;

import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';

function Login() {
  const {
    setEmail, setPassword, isDisabled } = useContext(RecipesContext);

  const handleClickButton = (event) => {
    event.preventDefault();
  };

  return (
    <form>
      <label htmlFor="email-id">
        Email:
        <input
          data-testid="email-input"
          type="email"
          placeholder="email"
          id="email-id"
          onChange={ (event) => setEmail(event.target.value) }
        />
      </label>
      <label htmlFor="password-id">
        Senha:
        <input
          data-testid="password-input"
          type="password"
          placeholder="password"
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
    </form>
  );
}

export default Login;

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login }></Route>
      <Route path="/foods"></Route>
      <Route path="/drinks"></Route>
      <Route path="/foods/{id-da-receita}"></Route>
      <Route path="/drinks/{id-da-receita}"></Route>
      <Route path="/foods/{id-da-receita}/in-progress"></Route>
      <Route path="/drinks/{id-da-receita}/in-progress"></Route>
      <Route path="/profile"></Route>
      <Route path="/done-recipes"></Route>
      <Route path="/favorite-recipes"></Route>
    </Switch>
  );
}

export default App;

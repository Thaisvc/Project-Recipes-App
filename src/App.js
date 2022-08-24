import React from 'react';
import { Route, Switch } from 'react-router-dom';
import DoneRecipes from './pages/DoneRecipes';
import Drinks from './pages/Drinks';
import Favorites from './pages/Favorites';
import FoodDetails from './pages/FoodDetails';
import Foods from './pages/Foods';
import Login from './pages/Login';
import Profile from './pages/Profile';
import RevenueFoods from './components/RevenueFoods';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/foods" component={ Foods } />
      <Route exact path="/drinks" component={ Drinks } />
      <Route path="/foods/{id-da-receita}" />
      <Route path="/drinks/{id-da-receita}" />
      <Route exact path="/receitas/foods" component={ RevenueFoods } />
      <Route exact path="/receitas/drinks" component={ RevenueFoods } />
      <Route path="/foods/:id" render={ (props) => (<FoodDetails { ...props } />) } />
      <Route path="/drinks/:id" render={ (props) => (<FoodDetails { ...props } />) } />
      <Route exact path="/profile" component={ Profile } />
      <Route exact path="/done-recipes" component={ DoneRecipes } />
      <Route exact path="/favorite-recipes" component={ Favorites } />
    </Switch>
  );
}

export default App;

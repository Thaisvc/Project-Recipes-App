import React from 'react';
import { Route, Switch } from 'react-router-dom';
import DoneRecipes from './pages/DoneRecipes';
import Drinks from './pages/Drinks';
import Favorites from './pages/Favorites';
import Foods from './pages/Foods';
import Login from './pages/Login';
import Profile from './pages/Profile';
import './App.css';
import RevenueFoods from './components/RevenueFoods';
import RecipeDetails from './components/RecipeDetails';
import RecipeInProgress from './pages/RecipeInProgress';
import './index.css';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/foods" component={ Foods } />
      <Route exact path="/drinks" component={ Drinks } />
      <Route exact path="/receitas/foods" component={ RevenueFoods } />
      <Route exact path="/receitas/drinks" component={ RevenueFoods } />
      <Route exact path="/foods/:idFood" component={ RecipeDetails } />
      <Route exact path="/drinks/:idDrink" component={ RecipeDetails } />
      <Route exact path="/foods/:idFood/in-progress" component={ RecipeInProgress } />
      <Route exact path="/drinks/:idDrink/in-progress" component={ RecipeInProgress } />
      <Route exact path="/profile" component={ Profile } />
      <Route exact path="/done-recipes" component={ DoneRecipes } />
      <Route exact path="/favorite-recipes" component={ Favorites } />
    </Switch>
  );
}
export default App;

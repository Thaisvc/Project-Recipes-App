import React, { useContext, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import apiFood from '../fetchApi/apiFood';
import apiDrink from '../fetchApi/apiDrink';

function RecipeDetails() {
  const { setRecipeDetail, recipeDetail, titlePage, setFoodsApi, setDrinksApi,
    setCategoryFoodsBtn, setApiOfFood, setApiOfDrink, drinksApi } = useContext(RecipesContext);
  const { idDrink } = useParams();
  const { idFood } = useParams();
  const { pathname } = useLocation();

  useEffect(() => {
    const func = async () => {
      if (pathname.includes('drinks')) {
        const results = await apiFood();
        setFoodsApi(results);
        setApiOfFood(results);
      }
      if (pathname.includes('foods')) {
        const resultsDrinks = await apiDrink();
        setDrinksApi(resultsDrinks);
        setApiOfDrink(resultsDrinks);
      }
      // if () {

      // }
    };
    func();
  }, [setFoodsApi, setDrinksApi,
    titlePage, setCategoryFoodsBtn, setApiOfFood, setApiOfDrink, pathname]);

  useEffect(() => {
    console.log(pathname);
    if (pathname.includes('foods')) {
      const callingFoodIdApi = async (idParam) => {
        const idFoodApi = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idParam}`);
        const responseFoodIdApi = await idFoodApi.json();
        console.log('chamou api de comida');
        return responseFoodIdApi.meals;
      };
      callingFoodIdApi(idFood).then((response) => setRecipeDetail(response));
    } else {
      const callingDrinksIdApi = async (idParam) => {
        const idDrinksApi = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idParam}`);
        const responseDrinksApi = await idDrinksApi.json();
        console.log('chamou api de bebida');
        return responseDrinksApi.drinks;
      };
      callingDrinksIdApi(idDrink).then((response) => setRecipeDetail(response));
    }
  }, []);

  console.log(recipeDetail);
  const ingredientsFilter = recipeDetail.map((recipe) => Object
    .keys(recipe).filter((k) => k.includes('strIngredient'))
    .map((ingredient) => recipe[ingredient]));
  const arrayOfIngredients = ingredientsFilter[0];
  console.log(arrayOfIngredients);
  const ember = recipeDetail.map((recipe) => recipe.strYoutube.split('='));
  const numberToEmber = ember.map((a) => a[1]);
  // console.log(ember);
  // console.log(numberToEmber);
  // console.log(drinksApi);
  console.log(ingredientsFilter);
  const SIX = 6;

  return (
    <div>
      { pathname.includes('drinks') ? (recipeDetail.map((recipe) => (
        <div key={ recipe.idDrink }>
          <img
            alt={ `${recipe.strDrink}-recipe` }
            src={ recipe.strDrinkThumb }
            data-testid="recipe-photo"
            width="400px"
          />
          <p data-testid="recipe-title">{ recipe.strDrink }</p>
          <p data-testid="recipe-category">{ recipe.strCategory }</p>
          { arrayOfIngredients.map((ingredient, index) => (
            <p
              key={ index }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              { ingredient }
            </p>
          )) }
          <p data-testid="instructions">{ recipe.strInstructions }</p>
          {/* { Object.keys(recipe).filter((k) => k.includes('strIngredient'))
              .map((ingredient) => recipe[ingredient]) } */}
        </div>
      ))) : (
        <div>
          {recipeDetail.map((recipe) => (
            <div key={ recipe.idMeal }>
              <img
                alt={ `${recipe.strMeal}-recipe` }
                src={ recipe.strMealThumb }
                data-testid="recipe-photo"
                width="400px"
              />
              <p data-testid="recipe-title">{ recipe.strMeal }</p>
              <p data-testid="recipe-category">{ recipe.strCategory }</p>
              { arrayOfIngredients.map((ingredient, index) => (
                <p
                  key={ index }
                  data-testid={ `${index}-ingredient-name-and-measure` }
                >
                  { ingredient }
                  {/* { recipe.strMeasure1 } */}
                </p>
              )) }
              <p data-testid="instructions">{ recipe.strInstructions }</p>
              <iframe
                src={ `https://www.youtube.com/embed/${numberToEmber[0]}` }
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
                title="video"
                data-testid="video"
              />

            </div>
          ))}
          { drinksApi.slice(0, SIX).map((d, index) => (
            <div key={ index } data-testid={ `${index}-recomendation-card` }>
              <p>{ d.strDrink }</p>
              <p>{ d.strAlcoholic }</p>
              <img width="60px" src={ d.strDrinkThumb } alt={ `${d.strDrink}-recipe` } />
            </div>
          )) }
        </div>
      )}
    </div>
  );
}

export default RecipeDetails;

// idMeal
// strMeal
// strMealThumb

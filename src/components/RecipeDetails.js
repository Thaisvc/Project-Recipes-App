import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useParams, useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import apiFood from '../fetchApi/apiFood';
import apiDrink from '../fetchApi/apiDrink';
import './RecipeDetails.css';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function RecipeDetails() {
  const { setRecipeDetail, recipeDetail, titlePage, setFoodsApi, setDrinksApi,
    setCategoryFoodsBtn, setApiOfFood, setApiOfDrink, drinksApi, foodsApi, linkCopied,
    setLinkCopied, favorited, handleShare, handleFavorite, getFavoriteLocalStorage,
  } = useContext(RecipesContext);

  const [inProgressItems, setInProgressItems] = useState(false);
  const { idDrink, idFood } = useParams();
  const history = useHistory();
  const { pathname } = useLocation();
  const type = pathname.slice('1', '6');
  const SIX = 6;

  const handleProgress = () => {
    // Requisito 30 - Função que verifica se existe itens na chave inProgressRecipes no localStorage. Se não tiver, insere o primeiro item, respeitando se é um 'drink' ou 'food'. Se tiver, apenas acrescenta mais um item em 'cocktails' ou 'meals' se for drink ou food respectivamente.
    const keyInProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (keyInProgressRecipes === null) {
      if (idDrink) {
        localStorage.setItem('inProgressRecipes', JSON.stringify(
          { cocktails: { [idDrink]: [] }, meals: { } },
        ));
      }
      if (idFood) {
        localStorage.setItem('inProgressRecipes', JSON.stringify(
          { cocktails: { }, meals: { [idFood]: [] } },
        ));
      }
      if (keyInProgressRecipes !== null) {
        const { cocktails, meals } = keyInProgressRecipes;
        if (idDrink) {
          localStorage.setItem('inProgressRecipes', JSON.stringify(
            { cocktails: { ...cocktails, [idDrink]: [] },
              meals: { ...meals },
            },
          ));
        }
        if (idFood) {
          localStorage.setItem('inProgressRecipes', JSON.stringify(
            { cocktails: { ...cocktails },
              meals: { ...meals, [idFood]: [] },
            },
          ));
        }
      }
    }
    if (pathname === `/foods/${idFood}`) {
      history.push(`${idFood}/in-progress`);
    } else if (pathname === `/drinks/${idDrink}`) {
      history.push(`${idDrink}/in-progress`);
    }
  };

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
    };
    func();
  }, [setFoodsApi, setDrinksApi,
    titlePage, setCategoryFoodsBtn, setApiOfFood, setApiOfDrink, pathname]);
  useEffect(() => {
    if (pathname.includes('foods')) {
      const callingFoodIdApi = async (idParam) => {
        const idFoodApi = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idParam}`);
        const responseFoodIdApi = await idFoodApi.json();
        return responseFoodIdApi.meals;
      };
      callingFoodIdApi(idFood).then((response) => setRecipeDetail(response));
      // Requisito 30 - Verifica se a chave 'inProgressRecipes' no localStorage contém itens. Se tiver, pegamos a 'keys' do objeto 'meals' e no 'cocktails' pois eles são ID's de receitas em progresso. Se a ID for igual da receita da tela "RecipeDetails", o botão renderiza "Continue Recipe", demonstrando que a receita já havia sido iniciada. Se não tiver sido iniciada, ela não está no localStorage e o botão renderiza "Start Recipe".
      const keyInProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
      if (keyInProgressRecipes !== null) {
        setInProgressItems(Object.keys(keyInProgressRecipes.meals)
          .some((key) => key === idFood));
      }
    } else {
      const callingDrinksIdApi = async (idParam) => {
        const idDrinksApi = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idParam}`);
        const responseDrinksApi = await idDrinksApi.json();
        return responseDrinksApi.drinks;
      };
      callingDrinksIdApi(idDrink).then((response) => setRecipeDetail(response));
      const keyInProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
      if (keyInProgressRecipes !== null) {
        setInProgressItems(Object.keys(keyInProgressRecipes.cocktails)
          .some((key) => key === idDrink));
      }
    }
    getFavoriteLocalStorage(idFood, idDrink);
    setLinkCopied(false);
  }, [idDrink, idFood, pathname, setRecipeDetail,
    getFavoriteLocalStorage, setLinkCopied]);
  const ingredientsFilter = recipeDetail.map((recipe) => Object
    .keys(recipe).filter((k) => k.includes('strIngredient'))
    .map((ingredient) => recipe[ingredient]));
  const handleEmbed = () => {
    const ember = recipeDetail.map((recipe) => recipe.strYoutube.split('='));
    const numberToEmber = ember.map((a) => a[1]);
    return numberToEmber[0];
  };

  return (
    <div>
      <h1>RecipeDetails</h1>
      { pathname.includes('drinks') ? (recipeDetail.map((recipe) => (
        <div key={ recipe.idDrink }>
          <img
            alt={ `${recipe.strDrink}-recipe` }
            src={ recipe.strDrinkThumb }
            data-testid="recipe-photo"
            width="400px"
          />
          <p data-testid="recipe-title">{ recipe.strDrink }</p>
          <p data-testid="recipe-category">{ recipe.strAlcoholic }</p>
          { ingredientsFilter[0].filter((ingredient) => ingredient !== null
          && ingredient.length !== 0).map((ingredient, index) => (
            <p key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
              { ingredient }
              {' '}
              { recipe[`strMeasure${index + 1}`] }
            </p>)) }
          <p data-testid="instructions">{ recipe.strInstructions }</p>
          {/* Requisito 32 - Implementando 2 botões de "Compartilhar" e "Favoritar" */}
          <div>
            <button type="button" onClick={ () => handleShare(window.location.href) }>
              <img src={ shareIcon } alt="share button" data-testid="share-btn" />
            </button>
            <button type="button" onClick={ () => handleFavorite(type, idFood, idDrink) }>
              <img
                // Requisito 35 - Que verifica se a receita está favoritada ou não. Caso favoritada o ícone é preto, caso contrário, é branco.
                src={ favorited ? blackHeartIcon : whiteHeartIcon }
                alt="favorite button"
                data-testid="favorite-btn"
              />
            </button>
          </div>
          {/* Requisito 33 - Caso a pessoa tenha clicado no botão "Share" renderiza a mensagem abaixo */}
          {linkCopied && <span>Link copied!</span>}
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
              { ingredientsFilter[0].filter((ingredient) => ingredient !== null
          && ingredient.length !== 0)
                .map((ingredient, index) => (
                  <p key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
                    { ingredient }
                    {' '}
                    { recipe[`strMeasure${index + 1}`] }
                  </p>)) }
              <p data-testid="instructions">{ recipe.strInstructions }</p>
              <iframe
                src={ `https://www.youtube.com/embed/${handleEmbed()}` }
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
                title="video"
                data-testid="video"
              />
              {/* Requisito 32 - Implementando 2 botões de "Compartilhar" e "Favoritar" */}
              <div>
                <button type="button" onClick={ () => handleShare(window.location.href) }>
                  <img src={ shareIcon } alt="share button" data-testid="share-btn" />
                </button>
                <button
                  type="button"
                  onClick={ () => handleFavorite(type, idFood, idDrink) }
                >
                  <img
                    // Requisito 35 - Que verifica se a receita está favoritada ou não. Caso favoritada o ícone é preto, caso contrário, é branco.
                    src={ favorited ? blackHeartIcon : whiteHeartIcon }
                    alt="favorite button"
                    data-testid="favorite-btn"
                  />
                </button>
              </div>
              {/* Requisito 33 - Caso a pessoa tenha clicado no botão "Share" renderiza a mensagem abaixo */}
              {linkCopied && <span>Link copied!</span>}
            </div>
          ))}
        </div>)}
      <div className="testimonials">
        <div className="scroller">
          { pathname.includes('foods') ? (drinksApi.slice(0, SIX).map((d, index) => (
            <div
              className="item"
              key={ index }
              data-testid={ `${index}-recomendation-card` }
            >
              <p data-testid={ `${index}-recomendation-title` }>{ d.strDrink }</p>
              <p>{ d.strAlcoholic }</p>
              <img width="60px" src={ d.strDrinkThumb } alt={ `${d.strDrink}-recipe` } />
            </div>
          ))) : null }
        </div>
      </div>
      <div className="testimonials">
        <div className="scroller">
          { pathname.includes('drinks') ? (foodsApi.slice(0, SIX).map((d, index) => (
            <div
              className="item"
              key={ index }
              data-testid={ `${index}-recomendation-card` }
            >
              <p data-testid={ `${index}-recomendation-title` }>{ d.strMeal }</p>
              <p>{ d.strCategory }</p>
              <img width="60px" src={ d.strMealThumb } alt={ `${d.strMeal}-recipe` } />
            </div>))) : null }
          <button
            data-testid="start-recipe-btn"
            type="button"
            className="start_recipe"
            onClick={ handleProgress }
          >
            {/* Requisito 30 - InprogressItems é o estado que recebeu o valor boolean true ou false na verificação da useEffect, para saber se o ID da receita da tela de RecipeDetails é uma receita que foi iniciada ou não. */}
            { inProgressItems ? 'Continue Recipe' : 'Start Recipe' }
          </button>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetails;

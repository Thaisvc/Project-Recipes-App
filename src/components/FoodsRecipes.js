import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import categoryFoodApi from '../fetchApi/categoryFood';
import './RecipesFoodDrink.css';

function FoodsRecipes() {
  const { foodsApi, categoryOfFoods,
    apiOfFood,
    isClickOne,
    setClickOne,
    setCategoryOfFoods, categoryFoodsBtn,
    setCategoryFoodsBtn, setFoodsApi } = useContext(RecipesContext);
  const minArray = 12;

  useEffect(() => {
    const result = async () => {
      const categoryResultApi = await categoryFoodApi();
      setCategoryFoodsBtn(categoryResultApi);
    };
    result();
  }, [setCategoryFoodsBtn]);

  useEffect(() => {
    const foodCategory = async () => {
      const resultApiCategory = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryOfFoods}`);
      const data = await resultApiCategory.json();
      setFoodsApi(data.meals.slice(0, minArray));
    };
    if (categoryOfFoods.length !== 0) {
      foodCategory();
    }
  }, [categoryOfFoods, setFoodsApi]);

  const handleClick = (c) => {
    console.log('ok');
    setClickOne(!isClickOne);
    if (isClickOne) {
      setCategoryOfFoods(c);
    }
    if (isClickOne === false) {
      setFoodsApi(apiOfFood);
    }
  };

  return (
    <div className="contener">
      <button
        className="button_categories"
        type="button"
        data-testid="All-category-filter"
        onClick={ () => { setFoodsApi(apiOfFood); setClickOne(true); } }
      >
        All
      </button>
      {categoryFoodsBtn.map(({ strCategory }, index) => (
        <button
          className="button_categories"
          type="button"
          key={ index }
          data-testid={ `${strCategory}-category-filter` }
          onClick={ () => handleClick(strCategory) }
        >
          {strCategory}
        </button>
      ))}
      {foodsApi.slice(0, minArray).map((meal, index) => (
        <Link to={ `/foods/${meal.idMeal}` } key={ meal.idMeal }>
          <div data-testid={ `${index}-recipe-card` } className="card">
            <img
              className="image_card"
              src={ meal.strMealThumb }
              alt={ meal.strMeal }
              width="155px"
              data-testid={ `${index}-card-img` }
            />
            <p
              data-testid={ `${index}-card-name` }
            >
              {meal.strMeal}

            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default FoodsRecipes;

import React, { useContext, useEffect } from 'react';
import RecipesContext from '../context/RecipesContext';
import categoryFoodApi from '../fetchApi/categoryFood';

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
    <div>
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ () => { setFoodsApi(apiOfFood); setClickOne(true); } }
      >
        All
      </button>
      {categoryFoodsBtn.map(({ strCategory }, index) => (
        <button
          type="button"
          key={ index }
          data-testid={ `${strCategory}-category-filter` }
          onClick={ () => handleClick(strCategory) }
        >
          {strCategory}
        </button>
      ))}
      {foodsApi.slice(0, minArray).map((meal, index) => (
        <div key={ meal.idMeal } data-testid={ `${index}-recipe-card` }>
          <img
            src={ meal.strMealThumb }
            alt={ meal.strMeal }
            width="100px"
            data-testid={ `${index}-card-img` }
          />
          <p data-testid={ `${index}-card-name` }>{meal.strMeal}</p>
        </div>
      ))}
    </div>
  );
}

export default FoodsRecipes;

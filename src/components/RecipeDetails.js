import React, { useContext, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';

function RecipeDetails() {
  const { setRecipeDetail } = useContext(RecipesContext);
  const { idDrink } = useParams();
  const { idFood } = useParams();
  const { pathname } = useLocation();

  useEffect(() => {
    console.log(pathname);
    if (pathname.includes('foods')) {
      const callingFoodIdApi = async (idParam) => {
        const idFoodApi = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idParam}`);
        const responseFoodIdApi = await idFoodApi.json();
        console.log('chamou api de comida');
        return responseFoodIdApi;
      };
      callingFoodIdApi(idFood).then((response) => setRecipeDetail(response));
    } else {
      const callingDrinksIdApi = async (idParam) => {
        const idDrinksApi = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idParam}`);
        const responseDrinksApi = await idDrinksApi.json();
        console.log('chamou api de bebida');
        return responseDrinksApi;
      };
      callingDrinksIdApi(idDrink).then((response) => setRecipeDetail(response));
    }
  }, []);

  return (
    <div>
      RecipeDetails
    </div>
  );
}

export default RecipeDetails;

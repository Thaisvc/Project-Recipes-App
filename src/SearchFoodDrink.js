// import { useContext } from 'react';
import { fetchApiIngredientFood, fetchApiNameFood,
  fetchApiFirstLetterFood } from './serviceSearch/getApiFood';
import { fetchApiIngredientDrink, fetchApiNameDrink,
  fetchApiFirstLetterDrink } from './serviceSearch/getApiDrinks';

export const Foods = async (searchA, searchB) => {
  if (searchB === 'Ingredient') {
    const results = await fetchApiIngredientFood(searchA);
    return results;
  } if (searchB === 'Name') {
    const results = await fetchApiNameFood(searchA);
    return results;
  }
  if (searchB === 'First Letter') {
    const results = await fetchApiFirstLetterFood(searchA);
    return results;
  }
  return Foods;
};

export const Drinks = async (searchA, searchB) => {
  if (searchB === 'Ingredient') {
    const results = await fetchApiIngredientDrink(searchA);
    return results;
  }
  if (searchB === 'Name') {
    const results = await fetchApiNameDrink(searchA);
    return results;
  }

  if (searchB === 'First Letter') {
    const results = await fetchApiFirstLetterDrink(searchA);
    return results;
  }
  console.log(Drinks);
};

import { fetchApiIngredientFood, fetchApiNameFood,
  fetchApiFirstLetterFood } from './getApiFood';
import { fetchApiIngredientDrink, fetchApiNameDrink,
  fetchApiFirstLetterDrink } from './getApiDrinks';

export const Foods = async (searchA, searchB) => {
  const erro = global.alert('Sorry, we haven\'t found any recipes for these filters.');
  if (searchB === 'Ingredient') {
    const results = await fetchApiIngredientFood(searchA);
    if (results === null) {
      console.log(results);
      return erro;
    }
    return results;
  } if (searchB === 'Name') {
    const results = await fetchApiNameFood(searchA);
    if (results === null) {
      console.log(results);
      return erro;
    }
    return results;
  }
  if (searchB === 'First Letter') {
    const results = await fetchApiFirstLetterFood(searchA);
    console.log(results);
    if (results === null) {
      return erro;
    }
    return results;
  }

  return Foods;
};

export const Drinks = async (searchA, searchB) => {
  const erro = global.alert('Sorry, we haven\'t found any recipes for these filters.');

  if (searchB === 'Ingredient') {
    const results = await fetchApiIngredientDrink(searchA);
    if (results === null) {
      return erro;
    }
    return results;
  }
  if (searchB === 'Name') {
    const results = await fetchApiNameDrink(searchA);
    if (results === null) {
      return erro;
    }
    return results;
  }

  if (searchB === 'First Letter') {
    const results = await fetchApiFirstLetterDrink(searchA);
    if (results === null) {
      return erro;
    }
    return results;
  }
};

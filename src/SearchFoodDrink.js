// import { useContext } from 'react';
import { fetchApiIngredientFood, fetchApiNameFood,
  fetchApiFirstLetterFood } from './serviceSearch/getApiFood';
import { fetchApiIngredientDrink, fetchApiNameDrink,
  fetchApiFirstLetterDrink } from './serviceSearch/getApiDrinks';

export const Foods = (searchA, searchB) => {
  if (searchB === 'Ingredient') {
    const fetchIngredientFood = async () => {
      const results = await fetchApiIngredientFood(searchA);
    };
    fetchIngredientFood();
  } if (searchB === 'Name') {
    const fetchNameFood = async () => {
      const results = await fetchApiNameFood(searchA);
    };
    fetchNameFood();
  }
  if (searchB === 'First Letter') {
    const fetchFirstLetterFood = async () => {
      const results = await fetchApiFirstLetterFood(searchA);
    };
    fetchFirstLetterFood();
  }
};

export const Drinks = (searchA, searchB) => {
  if (searchB === 'Ingredient') {
    const fetchIngredientDrink = async () => {
      const results = await fetchApiIngredientDrink(searchA);
    };
    fetchIngredientDrink();
  } if (searchB === 'Name') {
    const fetchNameDrink = async () => {
      const results = await fetchApiNameDrink(searchA);
    };
    fetchNameDrink();
  }
  if (searchB === 'First Letter') {
    const fetchFirstLetterDrink = async () => {
      const results = await fetchApiFirstLetterDrink(searchA);
    };
    fetchFirstLetterDrink();
  }
};

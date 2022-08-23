export const END_POINT = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

const categoryDrinksApi = async () => {
  const response = await fetch(END_POINT);
  const data = await response.json();
  const { drinks } = data;
  // const FIVE = 5;
  // const fiveDrinks = drinks.slice(0, FIVE);
  // const mapOfDrinks = fiveDrinks.map((d) => d.strCategory);
  // console.log(data);
  // console.log(drinks);
  // console.log(fiveDrinks);
  // console.log(mapOfDrinks);
  return drinks;
};

export default categoryDrinksApi;

const URL_FOOD_CATEGORY = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
const minResult = 5;

const categoryFood = async () => {
  const data = await fetch(URL_FOOD_CATEGORY);
  const result = await data.json();

  return result.meals.slice(0, minResult);
};

export default categoryFood;

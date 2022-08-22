const URL_FOOD = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

const apiFood = async () => {
  const data = await fetch(URL_FOOD);
  const result = await data.json();

  return result.meals;
};

export default apiFood;

const URL_DRINK = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

const apiDrink = async () => {
  const data = await fetch(URL_DRINK);
  const result = await data.json();

  return result.drinks;
};

export default apiDrink;

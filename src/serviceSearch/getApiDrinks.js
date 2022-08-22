export const fetchApiIngredientDrink = async (ingredient) => {
  try {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
    const data = await response.json();
    console.log(data);
    return data.results;
  } catch (error) {
    console.log(error);
  }
};

export const fetchApiNameDrink = async (name) => {
  try {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
    const data = await response.json();
    console.log(data);
    return data.results;
  } catch (error) {
    console.log(error);
  }
};

export const fetchApiFirstLetterDrink = async (firstLetter) => {
  try {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`);
    const data = await response.json();
    console.log(data);
    return data.results;
  } catch (error) {
    console.log(error);
  }
};

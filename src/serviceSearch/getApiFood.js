export const fetchApiIngredientFood = async (ingredient) => {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
    const data = await response.json();
    return data.meals;
  } catch (error) {
    console.log(error);
  }
};

export const fetchApiNameFood = async (name) => {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
    const data = await response.json();
    return data.meals;
  } catch (error) {
    console.log(error);
  }
};

export const fetchApiFirstLetterFood = async (firstLetter) => {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`);
    const data = await response.json();
    return data.meals;
  } catch (error) {
    console.log(error);
  }
};

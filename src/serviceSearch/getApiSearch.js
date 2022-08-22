// test == https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken

export const fetchApiIngredient = async (ingredient) => {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
    const data = await response.json();
    console.log(data);
    return data.results;
  } catch (error) {
    console.log(error);
  }
};

export const fetchApiName = async (name) => {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
    const data = await response.json();
    console.log(data);
    return data.results;
  } catch (error) {
    console.log(error);
  }
};

export const fetchApiFirstLetter = async (firstLetter) => {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`);
    const data = await response.json();
    console.log(data);
    return data.results;
  } catch (error) {
    console.log(error);
  }
};

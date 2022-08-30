export const setCheckbox = (paramId, paramValue) => {
  const prev = JSON.parse(localStorage.getItem(paramId));
  // console.log('Anterioe' + prev);
  // console.log(paramValue);
  if (prev) {
    localStorage.setItem(paramId, JSON.stringify({ ...prev, ...paramValue }));
    return;
  }
  localStorage.setItem(paramId, JSON.stringify(paramValue));
  // console.log('tem nada então vai esse');
};

export const getItemStorageProgressRecipe = (key) => {
  if (localStorage.getItem(key)) return JSON.parse(localStorage.getItem(key));
  return { meals: {}, cocktails: {} };
};

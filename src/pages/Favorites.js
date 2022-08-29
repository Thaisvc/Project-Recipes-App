import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function Favorites() {
  const { setTitlePage } = useContext(RecipesContext);
  const [favoriteItems, setFavoriteItems] = useState([]);
  useEffect(() => {
    setTitlePage('Favorite Recipes');
    // Requisito 50 - Verificando se há itens favoritos e inserindo no state favoriteItems
    const favoritesLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favoritesLocalStorage !== null) {
      setFavoriteItems(favoritesLocalStorage);
    }
  }, [setTitlePage]);

  return (
    <div>
      <Header />
      {/* Requisito 50 - Renderizando os elementos necessários na tela com seus respectivos data-testid */}
      <button type="button" data-testid="filter-by-all-btn">All</button>
      <button type="button" data-testid="filter-by-food-btn">Food</button>
      <button type="button" data-testid="filter-by-drink-btn">Drinks</button>
      { favoriteItems.map((item, index) => (
        <div key={ index }>
          <img src={ item.image } alt="" data-testid={ `${index}-horizontal-image` } />
          <p data-testid={ `${index}-horizontal-top-text` }>{item.category}</p>
          <p data-testid={ `${index}-horizontal-name` }>{item.name}</p>
          <button type="button">
            <img
              src={ shareIcon }
              alt="share button"
              data-testid={ `${index}-horizontal-share-btn` }
            />
          </button>
          <button
            type="button"
          >
            <img
              src={ blackHeartIcon }
              alt="favorite button"
              data-testid={ `${index}-horizontal-favorite-btn` }
            />
          </button>
        </div>
      ))}
    </div>
  );
}

export default Favorites;

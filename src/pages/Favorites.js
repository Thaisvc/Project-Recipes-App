import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function Favorites() {
  const { setTitlePage, handleShare, linkCopied } = useContext(RecipesContext);
  const [favoriteItems, setFavoriteItems] = useState([]);
  useEffect(() => {
    setTitlePage('Favorite Recipes');
    // Requisito 50 - Verificando se há itens favoritos e inserindo no state favoriteItems
    const favoritesLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favoritesLocalStorage !== null) {
      setFavoriteItems(favoritesLocalStorage);
    }
  }, [setTitlePage]);
  // Requisito 54 - Função que filtra os ID's das receitas favoritas deixando todas menos a que está sendo desfavoritada
  const unfavorite = (itemID) => {
    const favoritesLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newFilter = favoritesLocalStorage.filter((item) => (item.id !== itemID));
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFilter));
    // Requisito 54 - Ao filtrar coloco o novo array no state 'favoriteItems' para serem renderizados.
    setFavoriteItems(newFilter);
  };

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
          <p data-testid={ `${index}-horizontal-top-text` }>
            {/* Requisito 51 - Apenas adaptei o que seria renderizado para esse data-testid */}
            { `${item.nationality} - ${item.category}` }
            {/* Requisito 52 - Apenas inseri o parágrafo de alcoholicOrNot caso seja um drink */}
            { item.alcoholicOrNot && <p>{item.alcoholicOrNot}</p> }
          </p>
          <p data-testid={ `${index}-horizontal-name` }>{item.name}</p>
          <div>
            {/* Requisito 53 - Utilizei a funçao handleShare que estava no RecipesProvider para copiar o link da receita e renderizar o "Link copied!" */}
            <button type="button" onClick={ () => handleShare(`http://localhost:3000/${item.type}s/${item.id}`) }>
              <img
                src={ shareIcon }
                alt="share button"
                data-testid={ `${index}-horizontal-share-btn` }
              />
            </button>
            {/* Requisito 54 - Ao clicar no botão é executada a função 'unfavorite' com o id específico da receita que deseja desfavoritar */}
            <button type="button" onClick={ () => unfavorite(item.id) }>
              <img
                src={ blackHeartIcon }
                alt="favorite button"
                data-testid={ `${index}-horizontal-favorite-btn` }
              />
            </button>
          </div>
          {linkCopied && <span>Link copied!</span>}
        </div>
      ))}
    </div>
  );
}

export default Favorites;

import React from 'react';
import PropTypes from 'prop-types';

function RevenueCard({ index, name, img }) {
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <img
        src={ img }
        alt="recipe thumbnail"
        data-testid={ `${index}-card-img` }
      />
      <p
        data-testid={ `${index}-card-name` }
      >
        { name }
      </p>
    </div>
  );
}

RevenueCard.propTypes = {
  name: PropTypes.string,
  index: PropTypes.number,
  img: PropTypes.string,
}.isRequired;

export default RevenueCard;

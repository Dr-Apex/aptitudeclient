import React from 'react';

const Card = ({product}) => {
  const cardTitle = product ? product.name : 'AptitudeCracker';

  return (
    <div className="card">
      <h3>{cardTitle}</h3>
      <button>Open</button>
    </div>
  );
};

export default Card;

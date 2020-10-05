import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../product/product.types';
import '../../../theme/index.scss';

type Props = {
  product: Product;
};

export const BOProductListItem: FC<Props> = ({ product }) => {
  return (
    <div className="listItem">
      <Link key={product.id} to={`/product/${product.id}`}>
        <div className="listTitle">{product.name}</div>
        <div className="listText">{product.price} €</div>
      </Link>
    </div>
  );
};

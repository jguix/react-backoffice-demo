import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../product/product.types';

type Props = {
  product: Product;
};

export const BOProductListItem: FC<Props> = ({ product }) => {
  return (
    <Link key={product.id} to={`/product/${product.id}`}>
      <div>{product.name}</div>
    </Link>
  );
};

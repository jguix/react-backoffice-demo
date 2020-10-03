import React, { FC } from 'react';
import { Link } from 'react-router-dom';

export const BOHeader: FC = () => {
  return (
    <>
      <span>
        <Link to="/customers">Customers</Link>
      </span>
      <span> | </span>
      <span>
        <Link to="/products">Products</Link>
      </span>
    </>
  );
};

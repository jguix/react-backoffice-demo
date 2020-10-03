import React, { FC } from 'react';
import { Link } from 'react-router-dom';

export const RnHeader: FC = () => {
  return (
    <>
      <span>
        <Link to="/">Customers</Link>
      </span>
      <span> | </span>
      <span>
        <Link to="/products">Products</Link>
      </span>
    </>
  );
};

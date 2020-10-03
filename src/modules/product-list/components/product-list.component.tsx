import React, { FC, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ApplicationStore } from '../../../store/store';
import { productCommands } from '../../product/product.commands';
import { Product } from '../../product/product.types';
import { RnProductListItem } from './product-list-item.component';
import { useHistory } from 'react-router-dom';

const LIMIT = 10;

export const RnProductList: FC = () => {
  const history = useHistory();

  const products = useSelector<ApplicationStore, Product[]>((state) => {
    const productIds = state.ui.productList.productIds;
    return productIds?.map((productId) => state.entities.products.byId[productId]);
  });

  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    if (page === 1) {
      productCommands.clearProducts();
    }
    productCommands.loadProducts(page, LIMIT).then(
      () => setLoading(false),
      () => setError(true)
    );
  }, [page]);

  const incrementPage = () => setPage(page + 1);
  const createProduct = () => history.push('/product');

  return (
    <>
      <h1>Products</h1>
      <button onClick={createProduct}>Create product</button>
      <hr />

      {isLoading && !products?.length && <div>Loading products...</div>}
      {isError && <div>Error loading products, please refresh page.</div>}

      {products?.map((product: Product) => (
        <RnProductListItem key={product.id} product={product} />
      ))}

      {products?.length > 0 && (
        <div>
          <hr />
          {isLoading ? <div>Loading products...</div> : <button onClick={incrementPage}>Load next {LIMIT}</button>}
        </div>
      )}
    </>
  );
};

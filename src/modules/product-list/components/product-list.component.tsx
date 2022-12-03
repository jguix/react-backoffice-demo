import React, { FC, useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { ApplicationStore } from '../../../store/store';
import { productCommands } from '../../product/product.commands';
import { Product } from '../../product/product.types';
import { BOProductListItem } from './product-list-item.component';
import { useHistory } from 'react-router-dom';
import { BOPageHeader } from '../../shared/components/page-header.component';
import '../../../theme/index.scss';
import { useInfiniteScroll } from '../../../hooks/useInfiniteScroll';
import { useWindowDimensions } from '../../../hooks/useWindowDimensions';

const HEADER_IMAGE_URL = 'https://bit.ly/2StaKsy';
const HEADER_HEIGHT = 430;
const LIST_ITEM_HEIGHT = 48;

export const BOProductList: FC = () => {
  const history = useHistory();
  const { height } = useWindowDimensions();

  const limit = useMemo(() => (height - HEADER_HEIGHT) / LIST_ITEM_HEIGHT + 1, [height]);

  const products = useSelector<ApplicationStore, Product[]>((state) => {
    const productIds = state.ui.productList.productIds;
    return productIds?.map((productId) => state.entities.products.byId[productId]);
  });

  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [page, setPage] = useState(1);
  const { isBottom } = useInfiniteScroll();

  useEffect(() => {
    if (isBottom) {
      incrementPage();
    }
  }, [isBottom]);

  useEffect(() => {
    setLoading(true);
    if (page === 1) {
      productCommands.clearProducts();
    }
    productCommands.loadProducts(page, limit).then(
      () => setLoading(false),
      () => setError(true)
    );
  }, [page]);

  const incrementPage = () => {
    setPage(page + 1);
  };

  const createProduct = () => history.push('/product');

  return (
    <>
      <BOPageHeader title="Products" backgroundImageUrl={HEADER_IMAGE_URL} />
      <div className="page">
        <button onClick={createProduct}>Create product</button>

        {isLoading && !products?.length && <div>Loading products...</div>}
        {isError && <div>Error loading products, please refresh page.</div>}

        <div className="list">
          {products?.map((product: Product) => (
            <BOProductListItem key={product.id} product={product} />
          ))}
        </div>

        {products?.length > 0 && isLoading && <div>Loading products...</div>}
      </div>
    </>
  );
};

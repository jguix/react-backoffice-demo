import React, { FC, useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { ApplicationStore } from '../../../store/store';
import { productCommands } from '../../product/product.commands';
import { Product } from '../../product/product.types';
import { BOProductListItem } from './product-list-item.component';
import { useNavigate } from 'react-router-dom';
import { BOHero } from '../../shared/components/hero.component';
import '../../../theme/index.scss';
import { useInfiniteScroll } from '../../../hooks/useInfiniteScroll';
import { useWindowDimensions } from '../../../hooks/useWindowDimensions';

const HEADER_IMAGE_URL = 'https://bit.ly/2StaKsy';
const LIST_ITEM_HEIGHT = 50;

export const BOProductList: FC = () => {
  const navigate = useNavigate();
  const { height } = useWindowDimensions();

  const limit = useMemo(() => height / LIST_ITEM_HEIGHT, [height]);

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
      setPage((page) => page + 1);
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
  }, [page, limit]);

  const createProduct = () => navigate('/product');

  return (
    <>
      <BOHero title="Products" backgroundImageUrl={HEADER_IMAGE_URL} />
      <div className="page">
        <button onClick={createProduct}>Create product</button>

        <div data-testid="product-list" className="list">
          {products?.map((product: Product) => (
            <BOProductListItem key={product.id} product={product} />
          ))}
        </div>

        {isLoading && <div data-testid="product-list-loading">Loading products...</div>}
        {isError && <div data-testid="product-list-error">Error loading products, please refresh page.</div>}
      </div>
    </>
  );
};

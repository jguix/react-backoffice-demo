import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ApplicationStore } from '../../../store/store';
import { Product } from '../../product/product.types';
import { productCommands } from '../product.commands';
import { useHistory } from 'react-router-dom';
import { BOHero } from '../../shared/components/hero.component';
import '../../../theme/index.scss';

const HEADER_IMAGE_URL = 'https://bit.ly/2GyBHs6';

export const BOProduct: FC = () => {
  const history = useHistory();
  const { id: idString } = useParams<{ id: string }>();
  const productId = (idString && parseInt(idString)) || undefined;
  const product = useSelector<ApplicationStore, Product | undefined>((state) => {
    return (productId && state.entities.products.byId[productId]) || undefined;
  });
  const emptyProduct = { name: '', photo: '', price: 0 } as Product;

  const [isLoading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState<string>();
  const [isError, setError] = useState(false);
  const [modifiedProduct, setModifiedProduct] = useState<Product>(emptyProduct);

  useEffect(() => {
    if (productId) {
      setLoadingStatus(true, 'Loading product...');
      productCommands.loadProduct(productId).then(
        () => setLoadingStatus(false),
        () => setError(true)
      );
    }
  }, [productId]);

  useEffect(() => {
    product && setModifiedProduct(product);
  }, [product]);

  const setLoadingStatus = (status: boolean, message?: string) => {
    setLoading(status);
    message && setLoadingMessage(message);
  };

  const onFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    const field = event.target.name;
    const value = event.target.value;
    modifiedProduct && setModifiedProduct({ ...modifiedProduct, [field]: value });
  };

  const navigateBack = () => history.goBack();
  const navigateToProducts = () => history.push('/products');

  const onSave = () => {
    if (product) {
      setLoadingStatus(true, 'Updating product...');
      modifiedProduct &&
        productCommands
          .updateProduct(modifiedProduct)
          .then(
            () => setLoadingStatus(false),
            () => setError(true)
          )
          .then(navigateBack);
    } else {
      setLoadingStatus(true, 'Saving product...');
      modifiedProduct &&
        productCommands
          .saveProduct(modifiedProduct)
          .then(
            () => setLoadingStatus(false),
            () => setError(true)
          )
          .then(navigateBack);
    }
  };

  const onDelete = () => {
    setLoadingStatus(true, 'Deleting product...');
    product &&
      productCommands
        .deleteProduct(product.id)
        .then(
          () => setLoadingStatus(false),
          () => setError(true)
        )
        .then(navigateToProducts);
  };

  if (isLoading === true) {
    return <div>{loadingMessage}</div>;
  }

  if (isError) {
    return <div>Error loading product, please refresh page.</div>;
  }

  return (
    <>
      <BOHero title="Edit Product" backgroundImageUrl={HEADER_IMAGE_URL} />

      {modifiedProduct && (
        <form className="pageForm" onSubmit={onSave}>
          {modifiedProduct.id && (
            <div className="formField">
              <div className="formLabel">
                <label>Id</label>
              </div>
              <input className="formInput" type="text" value={modifiedProduct.id} disabled />
            </div>
          )}
          <div className="formField">
            <div className="formLabel">
              <label>Name</label>
            </div>
            <input
              className="formInput"
              type="text"
              name="name"
              value={modifiedProduct.name}
              onChange={onFieldChange}
            />
          </div>
          <div className="formField">
            <div className="formLabel">
              <label>Price</label>
            </div>
            <input
              className="formInput"
              type="text"
              name="price"
              value={modifiedProduct.price}
              onChange={onFieldChange}
            />
          </div>
          <div className="formField">
            <div className="formLabel">
              <label>Photo</label>
            </div>
            <input
              className="formInput"
              type="text"
              name="photo"
              value={modifiedProduct.photo}
              onChange={onFieldChange}
            />
          </div>
          <button className="formButton" type="submit">
            Save
          </button>
          {productId && (
            <button className="formButton" onClick={onDelete}>
              Delete
            </button>
          )}
        </form>
      )}
    </>
  );
};

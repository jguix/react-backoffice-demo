import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ApplicationStore } from '../../../store/store';
import { Product } from '../../product/product.types';
import { productCommands } from '../product.commands';
import { useHistory } from 'react-router-dom';

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
  const navigateToProducts = () => history.push('/');

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
      <h1>Edit product</h1>
      {modifiedProduct && (
        <form onSubmit={onSave}>
          {modifiedProduct.id && (
            <div>
              <label>
                Id:&nbsp;
                <input type="text" value={modifiedProduct.id} disabled />
              </label>
            </div>
          )}
          <div>
            <label>
              Name:&nbsp;
              <input type="text" name="name" value={modifiedProduct.name} onChange={onFieldChange} />
            </label>
          </div>
          <div>
            <label>
              Price:&nbsp;
              <input type="text" name="price" value={modifiedProduct.price} onChange={onFieldChange} />
            </label>
          </div>
          <div>
            <label>
              Photo:&nbsp;
              <input type="text" name="photo" value={modifiedProduct.photo} onChange={onFieldChange} />
            </label>
          </div>
          <hr />
          <button type="submit">Save</button>&nbsp;
          {productId && <button onClick={onDelete}>Delete</button>}
        </form>
      )}
    </>
  );
};

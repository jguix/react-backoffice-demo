import React from 'react';
import { Redirect } from 'react-router-dom';
import { BOHeader } from '../../header/components/header.component';
import { PrivateRoute } from '../../auth/components/private-route.component';
import { BOCustomerList } from '../../customer-list/components/customer-list.component';
import { BOCustomer } from '../../customer/components/customer.component';
import { BOProductList } from '../../product-list/components/product-list.component';
import { BOProduct } from '../../product/components/product.component';

export const BOHome = () => {
  console.log(`Home component`);
  return (
    <div>
      <BOHeader />
      <PrivateRoute path="/customers" component={BOCustomerList} />
      <PrivateRoute path="/customer/:id" component={BOCustomer} />
      <PrivateRoute path="/customer" exact component={BOCustomer} />
      <PrivateRoute path="/products" component={BOProductList} />
      <PrivateRoute path="/product/:id" component={BOProduct} />
      <PrivateRoute path="/product" exact component={BOProduct} />
      <Redirect from="/home" to="/customers" />
    </div>
  );
};

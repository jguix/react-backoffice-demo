import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import { RnCustomerList } from './modules/customer-list/components/customer-list.component';
import { RnProductList } from './modules/product-list/components/product-list.component';
import { RnCustomer } from './modules/customer/components/customer.component';
import { RnHeader } from './modules/header/components/header.component';
import { RnProduct } from './modules/product/components/product.component';

const App = () => {
  return (
    <div className="App">
      <RnHeader />
      <Route path="/products" component={RnProductList} />
      <Route path="/product/:id" component={RnProduct} />
      <Route path="/product" exact component={RnProduct} />
      <Route path="/customers" component={RnCustomerList} />
      <Route path="/customer/:id" component={RnCustomer} />
      <Route path="/customer" exact component={RnCustomer} />
      <Route path="/" exact component={RnCustomerList} />
    </div>
  );
};

export default App;

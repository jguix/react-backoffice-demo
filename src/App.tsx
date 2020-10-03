import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import { BOCustomerList } from './modules/customer-list/components/customer-list.component';
import { BOProductList } from './modules/product-list/components/product-list.component';
import { BOCustomer } from './modules/customer/components/customer.component';
import { BOHeader } from './modules/header/components/header.component';
import { BOProduct } from './modules/product/components/product.component';

const App = () => {
  return (
    <div className="App">
      <BOHeader />
      <Route path="/products" component={BOProductList} />
      <Route path="/product/:id" component={BOProduct} />
      <Route path="/product" exact component={BOProduct} />
      <Route path="/customers" component={BOCustomerList} />
      <Route path="/customer/:id" component={BOCustomer} />
      <Route path="/customer" exact component={BOCustomer} />
      <Route path="/" exact component={BOCustomerList} />
    </div>
  );
};

export default App;

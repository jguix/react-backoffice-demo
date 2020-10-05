import React from 'react';
import './App.scss';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom';
import { PrivateRoute } from './modules/auth/components/private-route.component';
import { BOLogin } from './modules/auth/components/login.component';
import { BOCustomerList } from './modules/customer-list/components/customer-list.component';
import { BOProductList } from './modules/product-list/components/product-list.component';
import { BOCustomer } from './modules/customer/components/customer.component';
import { BOHeader } from './modules/header/components/header.component';
import { BOProduct } from './modules/product/components/product.component';

const App = () => {
  return (
    <Provider store={store}>
      <HashRouter>
        <div className="app">
          <div className="appContent">
            <BOHeader />
            <Switch>
              <Route exact path="/login" component={BOLogin} />
              <PrivateRoute path="/customers" component={BOCustomerList} />
              <PrivateRoute path="/customer/:id" component={BOCustomer} />
              <PrivateRoute path="/customer" exact component={BOCustomer} />
              <PrivateRoute path="/products" component={BOProductList} />
              <PrivateRoute path="/product/:id" component={BOProduct} />
              <PrivateRoute path="/product" exact component={BOProduct} />
              <Redirect from="/" to="/customers" />
            </Switch>
          </div>
        </div>
      </HashRouter>
    </Provider>
  );
};

export default App;

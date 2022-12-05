import React from 'react';
import './App.scss';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { Navigate, Route, Routes } from 'react-router-dom';
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
      <div className="app">
        <div className="appContent">
          <BOHeader />
          <Routes>
            <Route path="/login" element={<BOLogin />} />
            <Route
              path="/customers"
              element={
                <PrivateRoute>
                  <BOCustomerList />
                </PrivateRoute>
              }
            />
            <Route
              path="/customer/:id"
              element={
                <PrivateRoute>
                  <BOCustomer />
                </PrivateRoute>
              }
            />
            <Route
              path="/customer"
              element={
                <PrivateRoute>
                  <BOCustomer />
                </PrivateRoute>
              }
            />
            <Route
              path="/products"
              element={
                <PrivateRoute>
                  <BOProductList />
                </PrivateRoute>
              }
            />
            <Route
              path="/product/:id"
              element={
                <PrivateRoute>
                  <BOProduct />
                </PrivateRoute>
              }
            />
            <Route
              path="/product"
              element={
                <PrivateRoute>
                  <BOProduct />
                </PrivateRoute>
              }
            />
            <Route path="/" element={<Navigate to={'/customers'} />}></Route>
          </Routes>
        </div>
      </div>
    </Provider>
  );
};

export default App;

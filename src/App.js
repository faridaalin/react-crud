import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from './components/home/HomePage';
import LoginPage from './components/login/LoginPage';
import DashboardPage from './components/dashboard/DashboardPage';
import ProductPage from './components/products/ProductPage';
import AddProducts from './components/products/AddProducts';
import EditProduct from './components/products/EditProduct';
import Nav from './components/layout/Nav';
import { AuthProvider } from './context/AuthContext';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Nav />

        <div className='container'>
          <Switch>
            <Route exact path='/'>
              <HomePage />
            </Route>
            <Route path='/login'>
              <LoginPage />
            </Route>
            <Route path='/dashboard' exact>
              <DashboardPage />
            </Route>
            <Route path='/dashboard/products' exact>
              <ProductPage />
            </Route>
            <Route path='/dasboard/products/add' exact>
              <AddProducts />
            </Route>
            <Route path='/dasboard/products/edit/:id' exact>
              <EditProduct />
            </Route>
          </Switch>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

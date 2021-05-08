import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import CustomerPage from './pages/CustomerPage';
import { StoreTypes, fetchAllCustomers, fetchAdmin } from './redux';
import { BrowserRouter as Router, Switch, Route, Redirect, useHistory, useLocation } from 'react-router-dom';
import Loading from './components/Loading';
import Navigation from './components/Navigation';
import ProductPage from './pages/ProductPage';
import ProfitPage from './pages/ProfitPage';
import NewlyRegistered from './pages/customer/newlyRegistered';
import AllCustomers from './pages/customer/AllCustomers';
import CustomersByGender from './pages/customer/CustomersByGender';
import CustomersByAge from './pages/customer/CustomersByAge';
import CustomersByNat from './pages/customer/CustomersByNat';
import CustomerById from './pages/customer/CustomerById';
import NewlyAdded from './pages/product/newlyAdded';
import AllProducts from './pages/product/AllProducts';
import AllReviews from './pages/review/AllReviews';
import ProductById from './pages/product/ProductById';
import PurchasesByTerm from './pages/purchase/PurchasesByTerm';
import ReviewById from './pages/review/ReviewById';
import AddProduct from './pages/AddProductPage';
import AddAdmin from './pages/AddAdminPage';
import EditProductPage from './pages/edit/EditProductPage';
import EditCategoryPage from './pages/edit/EditCategoryPage';
import AddCategoryPaeg from './pages/AddCategoryPage';
import LoginPage from './pages/Authentication/LoginPage';
import { Admin } from './redux/reducers/admin/adminReducer';

export interface AppProps {
  customers: any;
  fetchCustomers: any;
  loading: boolean;
  admin: Admin;
  fetchAdmin: any;
}

const App: React.FC<AppProps> = ({ customers, fetchCustomers, loading, admin, fetchAdmin }) => {
  useEffect(() => {
    if (admin.name && admin.token) {
      return;
    }

    const name = sessionStorage.getItem('admin-name');
    const token = sessionStorage.getItem('admin-token');

    if (name && token) {
      return fetchAdmin({
        name,
        token
      });
    }
  }, [admin, fetchAdmin]);

  useEffect(() => {
    if (!customers.length) {
      fetchCustomers();
    }
  }, [customers, fetchCustomers]);

  return (
    <Router>
      {!admin.name && !admin.token ? (
        <>
          <Redirect to='/login' />
          <Route path='/login'>
            <LoginPage />
          </Route>
        </>
      ) : (
        <>
          <Navigation />
          <Switch>
            <Route path='/customers/newlyRegistered'>
              <NewlyRegistered />
            </Route>
            <Route path='/customers/all'>
              <AllCustomers />
            </Route>
            <Route path='/customers/gender/:gender'>
              <CustomersByGender />
            </Route>
            <Route path='/customers/age/:age'>
              <CustomersByAge />
            </Route>
            <Route path='/customers/nat/:nat'>
              <CustomersByNat />
            </Route>
            <Route path='/customers/:id'>
              <CustomerById />
            </Route>
            <Route exact={true} path='/products'>
              <ProductPage />
            </Route>
            <Route path='/products/new'>
              <NewlyAdded />
            </Route>
            <Route path='/products/all'>
              <AllProducts />
            </Route>
            <Route path='/products/:id'>
              <ProductById />
            </Route>
            <Route path='/reviews/all'>
              <AllReviews />
            </Route>
            <Route path='/reviews/:id'>
              <ReviewById />
            </Route>
            <Route exact={true} path='/profit'>
              <ProfitPage />
            </Route>
            <Route path='/profit/:term'>
              <PurchasesByTerm />
            </Route>
            <Route path='/add/product'>
              <AddProduct />
            </Route>
            <Route path='/add/category'>
              <AddCategoryPaeg />
            </Route>
            <Route path='/register'>
              <AddAdmin />
            </Route>
            <Route path='/edit/product'>
              <EditProductPage />
            </Route>
            <Route path='/edit/category'>
              <EditCategoryPage />
            </Route>
            <Route path='/login'>
              <LoginPage />
            </Route>
            <Route path='/' exact>
              <CustomerPage />
            </Route>
          </Switch>
        </>
      )}
    </Router>
  );
};

const mapStateToProps = (store: StoreTypes) => {
  return {
    customers: store.customers.customers,
    loading: store.customers.loading,
    admin: store.admin
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchCustomers: () => dispatch(fetchAllCustomers()),
    fetchAdmin: (auth: { name: string; token: string }) => dispatch(fetchAdmin(auth))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

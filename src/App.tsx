import { useEffect } from 'react';
import { connect } from 'react-redux';
import CustomerPage from './pages/CustomerPage';
import { StoreTypes, fetchAllCustomers } from './redux';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
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

export interface AppProps {
  customers: any;
  fetchCustomers: any;
  loading: boolean;
}

const App: React.FC<AppProps> = ({ customers, fetchCustomers, loading }) => {
  useEffect(() => {
    if (!customers.length) {
      fetchCustomers();
    }
  }, [customers, fetchCustomers]);

  return (
    <Router>
      {loading && <Loading />}
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
        <Route path='/' exact>
          <CustomerPage />
        </Route>
      </Switch>
    </Router>
  );
};

const mapStateToProps = (store: StoreTypes) => {
  return {
    customers: store.customers.customers,
    loading: store.customers.loading
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchCustomers: () => dispatch(fetchAllCustomers())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

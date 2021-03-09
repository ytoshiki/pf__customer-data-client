import { useEffect } from 'react';
import { connect } from 'react-redux';
import CustomerPage from './pages/CustomerPage';
import { StoreTypes, fetchAllCustomers } from './redux';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Header from './components/Header';
import Loading from './components/Loading';
import Navigation from './components/Navigation';
import GenderCategoryPage from './pages/GenderCategoryPage';
import AgeCategoryPage from './pages/AgeCategoryPage';
import NatCategoryPage from './pages/NatCategoryPage';
import ProductPage from './pages/ProductPage';

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
        <Route path='/category/gender/:gender'>
          <GenderCategoryPage />
        </Route>
        <Route path='/category/age/:age'>
          <AgeCategoryPage />
        </Route>
        <Route path='/category/nationality/:nat'>
          <NatCategoryPage />
        </Route>
        <Route path='/product'>
          <ProductPage />
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

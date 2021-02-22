import { useEffect } from 'react';
import { connect } from 'react-redux';
import CustomerPage from './pages/CustomerPage';
import { StoreTypes, fetchAllCustomers } from './redux';

export interface AppProps {
  customers: any;
  fetchCustomers: any;
}

const App: React.FC<AppProps> = ({ customers, fetchCustomers }) => {
  useEffect(() => {
    if (!customers.length) {
      fetchCustomers();
    }
  }, [customers, fetchCustomers]);

  return (
    <div>
      <CustomerPage />
    </div>
  );
};

const mapStateToProps = (store: StoreTypes) => {
  return {
    customers: store.customers.customers
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchCustomers: () => dispatch(fetchAllCustomers())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

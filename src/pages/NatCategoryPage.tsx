import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getCustomersByGender, getCustomersByNat, StoreTypes } from '../redux';
import { useHistory, useParams } from 'react-router-dom';
import { generateKey } from '../helpers';

export interface NatCategoryPageProps {
  customCustomers: {
    id: string;
    name: string;
    age: number;
    purchase: any[];
    nationality: string;
    avator: null | string;
    email: string;
    dateRegistered: string;
    gender: string;
  }[];
  category: string;
  getCustomersByNat: any;
  customers: {
    id: string;
    name: string;
    age: number;
    purchase: any[];
    nationality: string;
    avator: null | string;
    email: string;
    dateRegistered: string;
    gender: string;
  }[];
}

const NatCategoryPage: React.FC<NatCategoryPageProps> = ({ customCustomers, customers, category, getCustomersByNat }) => {
  const keyword: { nat: string } = useParams();
  const history = useHistory();
  const [unique, setUnique] = useState('');

  // In case users refresh the page which loses all the customers
  // Send back to home page
  useEffect(() => {
    if (!customers.length) {
      return history.push('/');
    }
  }, [customers, history]);

  // Only called for the first time
  // Set Custom customers based on param :gender
  useEffect(() => {
    setUnique(keyword.nat);

    if (!unique) {
      return getCustomersByNat(keyword.nat);
    }
  }, [getCustomersByNat, keyword, setUnique, unique]);

  return (
    <div>
      <div>
        <table>
          <tbody>
            <tr>
              <th>name</th>
              <th>age</th>
              <th>gender</th>
              <th>nat</th>
              <th>email</th>
              <th>avator</th>
              <th>registerd</th>
            </tr>
            {customCustomers.length &&
              customCustomers.map((customer) => {
                return (
                  <tr key={generateKey(customer.dateRegistered)}>
                    <th>{customer.name}</th>
                    <th>{customer.age}</th>
                    <th>{customer.gender}</th>
                    <th>{customer.nationality}</th>
                    <th>{customer.email}</th>
                    <th>
                      <img src={customer.avator ? customer.avator : 'https://cdn2.iconfinder.com/data/icons/random-outline-3/48/random_14-512.png'} alt='' />
                    </th>
                    <th>{customer.dateRegistered}</th>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const mapStateToProps = (store: StoreTypes) => {
  return {
    customCustomers: store.customers.customCustomers,
    category: store.customers.customKeyword,
    customers: store.customers.customers
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getCustomersByNat: (keyword: string) => dispatch(getCustomersByNat(keyword))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(NatCategoryPage);

import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getCustomersByAge, StoreTypes } from '../redux';
import { useHistory, useParams } from 'react-router-dom';
import { generateKey } from '../helpers';

export interface AgeCategoryPageProps {
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
  getCustomersByAge: any;
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

const AgeCategoryPage: React.FC<AgeCategoryPageProps> = ({ customCustomers, customers, category, getCustomersByAge }) => {
  const keyword: { age: string } = useParams();
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
  // Set Custom customers based on param :age
  useEffect(() => {
    setUnique(keyword.age);

    if (!unique) {
      return getCustomersByAge(keyword.age);
    }
  }, [getCustomersByAge, keyword, setUnique, unique]);

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
                      <img src={customer.avator ? customer.avator : ''} alt='' />
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
    getCustomersByAge: (keyword: string) => dispatch(getCustomersByAge(keyword))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AgeCategoryPage);

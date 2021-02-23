import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getCustomersByGender, StoreTypes } from '../redux';
import { useHistory, useParams } from 'react-router-dom';
import { generateKey } from '../helpers';

export interface GenderCategoryPageProps {
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
  getCustomersByGender: any;
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

const GenderCategoryPage: React.FC<GenderCategoryPageProps> = ({ customCustomers, customers, category, getCustomersByGender }) => {
  const keyword: { gender: string } = useParams();
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
    setUnique(keyword.gender);

    if (!unique) {
      return getCustomersByGender(keyword.gender);
    }
  }, [getCustomersByGender, keyword, setUnique, unique]);

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
    getCustomersByGender: (keyword: string) => dispatch(getCustomersByGender(keyword))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(GenderCategoryPage);

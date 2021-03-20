import axios from 'axios';
import { useEffect, useState } from 'react';
import './CustomerPageDetail.scss';
import logo from '../../images/avator.png';

export interface NewlyRegisteredProps {}

export interface CustomerData {
  avator: null | string;
  purchasedItems: any[];
  _id: string;
  username: string;
  age: number;
  nat: string;
  email: string;
  gender: string;
  dateRegistered: Date;
}

const NewlyRegistered: React.FC<NewlyRegisteredProps> = () => {
  const [customers, setCustomers] = useState<CustomerData[]>([]);

  useEffect(() => {
    if (customers.length < 0) {
      return;
    }

    const fetchCustomers = async () => {
      const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/customers/new`);

      const data = await response.data;

      if (!data.success) {
        console.log(data.message || 'FETCH ERROR');
      }

      setCustomers(data.data);
    };

    if (customers.length === 0) {
      fetchCustomers();
    }
  }, [customers, setCustomers]);

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  return (
    <div className='customer-page-detail'>
      <div className='customer-page-detail__title-wrapper'>
        <h1 className='customer-page-detail__title'>
          Customers Registered on {monthNames[new Date().getMonth()]} {new Date().getFullYear()}
        </h1>
      </div>
      {customers.length > 0 ? (
        <div>
          <h3>Total Number</h3>
          <span>{customers.length}</span>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Registered</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer._id}>
                  <td>
                    {customer.avator !== null ? <img src={customer.avator} alt='' /> : <img src={logo} alt='' style={{ maxWidth: '100px' }} />}
                    <span>{customer.username}</span>
                  </td>
                  <td>{customer.dateRegistered}</td>
                  <td>{customer.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        'No Customers'
      )}
    </div>
  );
};

export default NewlyRegistered;

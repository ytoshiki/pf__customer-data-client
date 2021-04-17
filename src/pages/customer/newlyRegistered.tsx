import axios from 'axios';
import { useEffect, useState } from 'react';
import './CustomerPageDetail.scss';
import logo from '../../images/avator.png';
import CustomerTable from '../../components/table/CustomerTable';

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
      <div className='customer-page-cards'>
        <div className='card'>
          <h2>Total Customers</h2>
          <p>{customers.length}</p>
        </div>
      </div>
      <div className='mg-30-bottom'></div>
      {customers.length > 0 ? <CustomerTable data={customers} head={['Name', 'Age', 'gender', 'Nat', 'Email', 'Registered']} body={['username', 'age', 'gender', 'nat', 'email', 'dateRegistered']} /> : 'No Customers'}
    </div>
  );
};

export default NewlyRegistered;

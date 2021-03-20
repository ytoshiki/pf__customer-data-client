import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import PurchaseList from '../../components/list/PurchaseList';
import Table from '../../components/table/CustomerTable';

import { CustomerData } from './newlyRegistered';

export interface ProductData {
  _id: string;
  name: string;
  price: number;
}

export interface PurchaseData {
  _id: string;
  product: null | ProductData;
  customer: string;
  createdAt: string;
}

export interface CustomerByIdProps {}

const CustomerById: React.SFC<CustomerByIdProps> = () => {
  const params = useParams();

  const id: string = (params as any).id;

  const [customer, setCustomer] = useState<CustomerData>();
  const [purchases, setPurchases] = useState<PurchaseData[]>([]);

  useEffect(() => {
    if (customer) {
      return;
    }

    const fetchCustomer = async () => {
      const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/customers/${id}`);

      const data = await response.data;

      if (!data.success) {
        console.log(data.message || 'FETCH ERROR');
      }

      setCustomer(data.customer);
    };

    if (!customer) {
      fetchCustomer();
    }
  }, [customer, setCustomer, id]);

  useEffect(() => {
    if (purchases.length > 0) {
      return;
    }

    const logPurchases = async () => {
      const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/purchase/${id}`);

      const data = await response.data;

      if (!data.success) {
        console.log(data.message || 'FETCH ERROR');
      }

      setPurchases(data.purchases);
    };

    if (purchases.length === 0) {
      logPurchases();
    }
  }, [id, purchases, setPurchases]);

  return (
    <div>
      <div className='customer-page-detail'>
        <div className='customer-page-detail__title-wrapper'>
          <h1 className='customer-page-detail__title'>Customer with ID of {id}</h1>
        </div>

        {customer && <Table data={[customer]} head={['name', 'date', 'email']} body={['username', 'dateRegistered', 'email']} />}
        {purchases && (
          <div>
            <h2>Purchases</h2>
            {purchases.length > 0 && <PurchaseList items={purchases} />}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerById;

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import PurchaseTable from '../../components/table/PurchaseTable';
import { PurchaseData } from '../customer/CustomerById';
import './PurchasePageDetail.scss';

export interface PurchasesByTermProps {}

const PurchasesByTerm: React.FC<PurchasesByTermProps> = () => {
  const params = useParams();
  const history = useHistory();
  const [total, setTotal] = useState(0);

  const [purchases, setPurchases] = useState<PurchaseData[]>([]);

  const term: string = (params as any).term;

  useEffect(() => {
    // Checking Route Validity
    if (term.split('-').length !== 2 && term !== 'year' && term !== 'month' && term !== 'week') {
      history.push('/');
    }
  }, [term, history]);

  useEffect(() => {
    if (purchases.length > 0) {
      return;
    }

    const fetchPurchases = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/purchase/term/${term}`);

        const data = await response.data;

        if (!data.success) {
          console.log(data.message || 'FETCH ERROR');
        }

        setPurchases(data.purchases);
      } catch (error) {
        console.log(error);
      }
    };

    if (purchases.length === 0) {
      fetchPurchases();
    }
  }, [term, purchases, setPurchases]);

  useEffect(() => {
    if (total) {
      return;
    }

    if (purchases.length === 0) {
      return;
    }

    const profits = purchases
      .filter((purchase) => {
        if (purchase.product !== null) {
          return true;
        }

        return false;
      })
      .reduce((acc, pur) => acc + (pur.product as any).price, 0);

    const rowProfit = Math.floor(profits * 10) / 10;

    let profit = Number(String(rowProfit).split('.')[0]);

    setTotal(profit);
  }, [total, purchases, setTotal]);

  return (
    <div>
      <div className='purchase-page-detail'>
        <div className='purchase-page-detail__title-wrapper'>
          <h1 className='purchase-page-detail__title'>
            Purchases made in {term.split('-').length === 1 ? 'this' : ''} {term}
          </h1>
        </div>
        <div className='cards'>
          <div className='card'>
            Total
            <span className='data'>${total}</span>
          </div>
        </div>
        {purchases.length > 0 ? <PurchaseTable data={purchases} head={['product', 'price($)', 'purchased By', 'date']} body={['product', 'price', 'customer', 'createdAt']} /> : 'No Purchase Record'}
      </div>
    </div>
  );
};

export default PurchasesByTerm;

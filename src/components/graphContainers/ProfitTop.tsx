import axios from 'axios';
import { useEffect, useState } from 'react';
import LineGraph from '../graph/Canvas.LineChart';
import './profitTop.scss';

export interface ProfitTopProps {}

const ProfitTop: React.SFC<ProfitTopProps> = () => {
  const [salesData, setSalesData] = useState<
    {
      date: string;
      profit: number;
    }[]
  >([]);

  useEffect(() => {
    if (salesData.length > 0) {
      return;
    }

    let mounted = true;

    const fetchSalesData = async () => {
      const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/purchase/data`);

      const data = await response.data;

      if (!data.success) {
        console.log(data.message || 'FETCH ERROR');
        return;
      }

      data.data.map((obj: { date: string; profit: number }) => {
        if (obj.profit !== 0) {
          obj.profit = Math.floor(obj.profit * Math.pow(10, 2)) / Math.pow(10, 2);
          return obj;
        }

        return obj;
      });

      if (mounted) setSalesData(data.data);
    };

    fetchSalesData();

    return () => {
      mounted = false;
    };
  }, [salesData, setSalesData]);

  return (
    <div className='profitTop'>
      <h2>Monthly Profit</h2>
      {salesData.length > 0 && <LineGraph data={salesData} x='date' y='profit' />}
    </div>
  );
};

export default ProfitTop;

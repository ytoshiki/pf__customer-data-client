import axios from 'axios';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import BarGraph from '../components/graph/BarGraph';
import MembershipGraph from '../components/graph/MembershipGraph';
import PieGraph from '../components/graph/PieGraph';
import RankingGraph from '../components/graph/RankingGraph';
import Header from '../components/Header';
import { StoreTypes, genderSelector, ageSelector, newlyRegisteredSelector, percentageSelector, natSelector } from '../redux';

import './CustomerPage.scss';

export interface CustomerPageProps {
  customers: any;
  genders: any;
  ages: any;
  newlyRegistered: number;
  percentage: number;
  nationalityData: any[];
}

interface RankingData {
  id: string;
  username: string;
  totalPurchases: number;
}

const CustomerPage: React.FC<CustomerPageProps> = ({ customers, genders, ages, newlyRegistered, percentage, nationalityData }) => {
  const [rankingData, setRankingData] = useState<RankingData[]>([]);

  const [satisfaction, setSatisfaction] = useState<number>();

  useEffect(() => {
    if (rankingData.length > 0) {
      return;
    }

    const fetchRankingData = async () => {
      const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/customers/purchased`);
      const data = await response.data;

      if (!data.success) {
        console.log(data.message || 'FETCH ERROR');
        return;
      }

      setRankingData(data.customers);
    };

    fetchRankingData();
  }, [rankingData, setRankingData]);

  useEffect(() => {
    if (satisfaction) {
      return;
    }

    const fetchSatisfaction = async () => {
      const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/reviews/satisfaction`);
      const data = await response.data;

      if (!data.success) {
        console.log(data.message || 'FETCH ERROR');
        return;
      }

      setSatisfaction(data.satisfaction);
    };

    if (!satisfaction) {
      fetchSatisfaction();
    }
  }, [satisfaction, setSatisfaction]);
  return (
    <>
      <Header category='customer' />
      <div className='customerpage'>
        <div className='customer-cards'>
          <Link to='/customers/newlyRegistered'>
            <div className='customer-card'>
              Newly Registered Customers
              <span className='data'>{newlyRegistered}+</span>
            </div>
          </Link>
          <Link to='customers/all'>
            <div className='customer-card'>
              Total Customers
              <span className='data'>{customers.length}</span>
            </div>
          </Link>
          <div className='customer-card'>
            Customer Increase In a year <span className='data'>{percentage}%</span>
          </div>
          {satisfaction && (
            <div className='customer-card'>
              Over All Satisfactions <span className='data'>{satisfaction}%</span>
            </div>
          )}
        </div>

        <div className='customerpage__top'>
          <div className='customerpage__left'>
            <PieGraph data={genders} label='Gender' />

            <PieGraph data={ages} label='Age' />
          </div>
          <div className='customerpage__membership'>
            {/* <h2>Total Membership: {customers.length}</h2> */}
            <MembershipGraph label='Total Memberships' />
          </div>
        </div>
        <div className='customerpage__right'>
          <BarGraph label='Nationality' data={nationalityData} x='country' y='number' />
          {rankingData && <RankingGraph data={rankingData} x='username' y='totalPurchases' label='Top Customers By Purchases' others={null} />}
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (store: StoreTypes) => {
  return {
    customers: store.customers.customers,
    genders: genderSelector(store),
    ages: ageSelector(store),
    newlyRegistered: newlyRegisteredSelector(store),
    percentage: percentageSelector(store),
    nationalityData: natSelector(store)
  };
};

export default connect(mapStateToProps)(CustomerPage);

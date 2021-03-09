import { connect } from 'react-redux';
import BarGraph from '../components/graph/BarGraph';
import MembershipGraph from '../components/graph/MembershipGraph';
import PieGraph from '../components/graph/PieGraph';
import RankingGraph from '../components/graph/RankingGraph';
import Header from '../components/Header';
import { StoreTypes, genderSelector, ageSelector, newlyRegisteredSelector, percentageSelector } from '../redux';
import './CustomerPage.scss';

export interface CustomerPageProps {
  customers: any;
  genders: any;
  ages: any;
  newlyRegistered: number;
  percentage: number;
}

const CustomerPage: React.FC<CustomerPageProps> = ({ customers, genders, ages, newlyRegistered, percentage }) => {
  return (
    <>
      <Header category='customer' />
      <div className='customerpage'>
        <p>Newly Registered Customers: {newlyRegistered}</p>
        <p>Total Customers: {customers.length}</p>
        <p>Percentage Increase In a year: {percentage}%</p>
        <p>Over All Satisfactions: 4.5/5</p>

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
          <BarGraph label='Nationality' />
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
    percentage: percentageSelector(store)
  };
};

export default connect(mapStateToProps)(CustomerPage);

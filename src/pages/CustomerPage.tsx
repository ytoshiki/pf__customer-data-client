import { connect } from 'react-redux';
import BarGraph from '../components/graph/BarGraph';
import MembershipGraph from '../components/graph/MembershipGraph';
import PieGraph from '../components/graph/PieGraph';
import RankingGraph from '../components/graph/RankingGraph';
import Header from '../components/Header';
import { StoreTypes, genderSelector, ageSelector } from '../redux';
import './CustomerPage.scss';

export interface CustomerPageProps {
  customers: any;
  genders: any;
  ages: any;
}

const CustomerPage: React.FC<CustomerPageProps> = ({ customers, genders, ages }) => {
  return (
    <>
      <Header category='customer' />
      <div className='customerpage'>
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

          <RankingGraph label='Top 10 Customers' />
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (store: StoreTypes) => {
  return {
    customers: store.customers.customers,
    genders: genderSelector(store),
    ages: ageSelector(store)
  };
};

export default connect(mapStateToProps)(CustomerPage);

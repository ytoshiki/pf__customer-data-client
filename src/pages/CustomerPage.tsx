import { connect } from 'react-redux';
import BarGraph from '../components/graph/BarGraph';
import PieGraph from '../components/graph/PieGraph';
import RankingGraph from '../components/graph/RankingGraph';
import { StoreTypes, genderSelector, ageSelector } from '../redux';
import './CustomerPage.scss';

export interface CustomerPageProps {
  customers: any;
  genders: any;
  ages: any;
}

const CustomerPage: React.FC<CustomerPageProps> = ({ customers, genders, ages }) => {
  return (
    <div className='customerpage'>
      <h2>Total Membership: {customers.length}</h2>
      <div className='customerpage__left'>
        <PieGraph data={genders} label='Gender' />

        <PieGraph data={ages} label='Age' />
      </div>
      <div className='customerpage__right'>
        <BarGraph label='World Share' />

        <RankingGraph label='Top 10 Customers' />
      </div>
    </div>
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

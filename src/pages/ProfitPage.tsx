import { useEffect } from 'react';
import { connect } from 'react-redux';
import ProfitCards from '../components/cards/ProfitCards';
import ProfitTop from '../components/graphContainers/ProfitTop';
import Header from '../components/Header';
import { StoreTypes } from '../redux';
import { fetchAllPurchases } from '../redux/actions/purchaseActions';
import { Purchase } from '../redux/reducers/purchase/purchaseReducer';
import './ProfitPage.scss';

export interface ProfitPageProps {
  purchases: Purchase[];
  fetchPurchases: any;
}

const ProfitPage: React.SFC<ProfitPageProps> = ({ purchases, fetchPurchases }) => {
  useEffect(() => {
    if (purchases.length > 0) {
      return;
    }

    fetchPurchases();
  }, [purchases, fetchPurchases]);
  return (
    <div className='profitpage'>
      <Header category='Profit' />
      <ProfitCards />
      <ProfitTop />
    </div>
  );
};

const mapStateToProps = (store: StoreTypes) => {
  return {
    purchases: store.purchases.purchases
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchPurchases: () => dispatch(fetchAllPurchases())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfitPage);

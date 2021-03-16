import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { kFormatter } from '../../helpers/kFormatter';
import { lastWeekProfitSelector, StoreTypes, thisMonthProfitSelector, thisWeekProfitSelector, lastMonthProfitSelector, thisYearProfitSelector } from '../../redux';
import { Purchase } from '../../redux/reducers/purchase/purchaseReducer';
import CircularBar from '../graph/Circular';

export interface ProfitCardProps {
  purchases: Purchase[];
  lastWeekProfit: number;
  thisWeekProfit: number;
  thisMonthProfit: number;
  lastMonthProfit: number;
  thisYearProfit: number;
}

const ProfitCards: React.SFC<ProfitCardProps> = ({ purchases, lastWeekProfit, thisWeekProfit, thisMonthProfit, lastMonthProfit, thisYearProfit }) => {
  const [weekIncrease, setWeekIncrease] = useState(0);
  const [monthIncrease, setMonthIncrease] = useState(0);
  const [weekKeyword, setWeekKeyword] = useState('');
  const [monthKeyword, setMonthKeyword] = useState('');

  useEffect(() => {
    if (!purchases) {
      return;
    }
  }, [purchases]);

  useEffect(() => {
    if (weekIncrease) {
      return;
    }

    let increase = thisWeekProfit - lastWeekProfit;
    increase = (increase / lastWeekProfit) * 100;

    if (increase > 0) {
      setWeekKeyword('increase');
      setWeekIncrease(Math.round(increase));
    } else if (increase < 0) {
      setWeekKeyword('decrease');
      setWeekIncrease(Math.round(Math.abs(increase)));
    }
  }, [weekIncrease, setWeekIncrease, lastWeekProfit, thisWeekProfit, setWeekKeyword]);

  useEffect(() => {
    if (monthIncrease) {
      return;
    }

    const increase = (lastMonthProfit / thisMonthProfit) * 100;

    if (increase > 0) {
      setMonthKeyword('increase');
      setMonthIncrease(Math.round(increase));
    } else if (increase < 0) {
      setMonthKeyword('decrease');
      setMonthIncrease(Math.round(Math.abs(increase)));
    }
  }, [monthIncrease, setMonthIncrease, lastMonthProfit, thisMonthProfit, setMonthKeyword]);

  return (
    <div className='profit-cards'>
      <div className='profit-cards__card'>
        <div className='main'>
          <Link to='profit/week'>
            <h3>This Week's Profit</h3>
            <span className='data'>${kFormatter(thisWeekProfit)}</span>
          </Link>
        </div>
        <div className='sub'>
          <CircularBar percentage={weekIncrease} color={weekKeyword === 'decrease' ? '207, 39, 39' : '102, 201, 102'} />
          <div className='space'></div>
          {weekIncrease !== 0 ? (
            <small>
              <span className='data'>
                {weekIncrease}% {weekKeyword}{' '}
              </span>{' '}
              from last Week's profit: <span className='data'>${kFormatter(lastWeekProfit)}</span>
            </small>
          ) : (
            <small>No Profit Last Week</small>
          )}
        </div>
      </div>
      <div className='profit-cards__card'>
        <div className='main'>
          <Link to='profit/month'>
            <h3>This Month's Profit</h3>
            <span className='data'>${kFormatter(thisMonthProfit)}</span>
          </Link>
        </div>
        <div className='sub'>
          <CircularBar percentage={monthIncrease} color={monthKeyword === 'decrease' ? '207, 39, 39' : '102, 201, 102'} />
          <div className='space'></div>
          {monthIncrease !== 0 ? (
            <small>
              <span className='data'>
                {monthIncrease}% {monthKeyword}
              </span>{' '}
              from last month's profit: <span className='data'>${kFormatter(lastMonthProfit)}</span>
            </small>
          ) : (
            <small>No Profit Last Month</small>
          )}
        </div>
      </div>
      <div className='profit-cards__card'>
        <div className='main'>
          <Link to='profit/year'>
            <h3>This Year's Profit</h3>
            <span className='data'>${kFormatter(thisYearProfit)}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (store: StoreTypes) => {
  return {
    purchases: store.purchases.purchases,
    lastWeekProfit: lastWeekProfitSelector(store),
    thisWeekProfit: thisWeekProfitSelector(store),
    thisMonthProfit: thisMonthProfitSelector(store),
    lastMonthProfit: lastMonthProfitSelector(store),
    thisYearProfit: thisYearProfitSelector(store)
  };
};

export default connect(mapStateToProps)(ProfitCards);

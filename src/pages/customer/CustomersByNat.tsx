import axios from 'axios';
import { useState, useEffect } from 'react';
import { PageData } from './AllCustomers';
import { useParams } from 'react-router';
import CustomerTable from '../../components/table/CustomerTable';
import SearchCustomer from '../../components/search/SearchCustomer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faSort, faUser } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { StoreTypes } from '../../redux';
import CircularBar from '../../components/graph/Circular';

export interface CustomerByNatProps {
  customers: any[];
}

const CustomersByNat: React.FC<CustomerByNatProps> = ({ customers }) => {
  const params = useParams();
  const nat: string = (params as any).nat;

  const [sort, setSort] = useState('date');
  const [by, setBy] = useState('desc');

  const [pageInfo, setPageInfo] = useState<PageData>();
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    if (pageInfo) {
      return;
    }

    const fetchCustomers = async () => {
      const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/customers/nat/${nat}/1/default/default`);
      const data = await response.data;

      if (!data.success) {
        console.log(data.message || 'FETCH_ERROR');
        return;
      }

      setPageInfo(data);
      setPercent(Math.round(((data.total as number) / customers.length) * 100));
    };

    if (!pageInfo) {
      fetchCustomers();
    }
  }, [pageInfo, setPageInfo, nat, customers, setPercent]);

  let pages: number[] = [];

  if (pageInfo?.total_page) {
    for (let i = 0; i < pageInfo?.total_page; i++) {
      pages.push(i + 1);
    }
  }

  const changePage = async (page: number) => {
    if (!page) {
      page = 1;
    }

    if (page > (pageInfo?.total_page as any)) {
      page = 1;
    }

    const response = await axios(`${process.env.REACT_APP_API_ENDPOINT}/customers/nat/${nat}/${page}/${sort}/${by}`);
    const data = await response.data;

    if (!data) {
      console.log(data.message || 'FETCH_ERROR');
      return;
    }

    setPageInfo(data);
    // console.log(page);
  };

  const sortCustomers = async () => {
    if (pageInfo) {
      const response = await axios(`${process.env.REACT_APP_API_ENDPOINT}/customers/nat/${nat}/${pageInfo.page}/${sort}/${by}`);

      const data = await response.data;

      if (!data) {
        console.log(data.message || 'FETCH_ERROR');
        return;
      }

      setPageInfo(data);
    }
  };

  const label = nat.toUpperCase();

  return (
    <div>
      <SearchCustomer />
      <div className='customer-page-detail'>
        <div className='customer-page-detail__title-wrapper'>
          <h1 className='customer-page-detail__title'>Customers From {label}</h1>
        </div>
        <div className='customer-page-cards'>
          <div className='card'>
            <h2>Total</h2>
            <p>
              <FontAwesomeIcon icon={faUser} className='card-icon' />
              {pageInfo?.total}/{customers.length}
            </p>
          </div>
          <div className='card is-bar'>
            <div className='customer-page-cards__bar'>
              <CircularBar percentage={percent} color='102, 201, 102' />
            </div>
          </div>
        </div>
        <div className='sort'>
          <div className='sort-block'>
            <label htmlFor=''>
              <FontAwesomeIcon icon={faFilter} />
            </label>
            <select onChange={(e) => setSort(e.target.value)}>
              <option value='date' defaultChecked>
                Register date
              </option>
              <option value='name'>Username</option>
            </select>
          </div>

          <div className='sort-block'>
            <label htmlFor=''>
              <FontAwesomeIcon icon={faSort} />
            </label>
            <select onChange={(e) => setBy(e.target.value)}>
              <option value='desc' defaultChecked>
                Ascending
              </option>
              <option value='insc'>Descending</option>
            </select>
          </div>

          <button onClick={sortCustomers}>Sort</button>
        </div>
        {pageInfo?.data && (
          <div>
            <CustomerTable data={pageInfo.data} head={['User', 'Age', 'gender', 'Nat', 'Email', 'Registered']} body={['username', 'age', 'gender', 'nat', 'email', 'dateRegistered']} />
            <div className='pagination'>
              {pageInfo.pre_page && (
                <button onClick={() => changePage(pageInfo.page - 1)} className='prev-button'>
                  Previous
                </button>
              )}
              {pages.length > 1 &&
                pages.map((page) => {
                  return (
                    <button key={page} className={page === pageInfo.page ? 'current_page' : ''} onClick={() => changePage(page)}>
                      {page}
                    </button>
                  );
                })}
              {pageInfo.next_page && (
                <button onClick={() => changePage(pageInfo.page + 1)} className='next-button'>
                  Next
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (store: StoreTypes) => {
  return {
    customers: store.customers.customers
  };
};

export default connect(mapStateToProps)(CustomersByNat);

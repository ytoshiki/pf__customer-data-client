import axios from 'axios';
import { useState, useEffect } from 'react';
import { PageData } from './AllCustomers';
import logo from '../../images/avator.png';
import { useParams } from 'react-router';
import CustomerTable from '../../components/table/CustomerTable';
import SearchCustomer from '../../components/search/SearchCustomer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faSort, faUser } from '@fortawesome/free-solid-svg-icons';

export interface CustomerByGenderProps {}

// /gender/:gender/:page/:sort/:by

const CustomersByGender: React.FC<CustomerByGenderProps> = (props) => {
  const params = useParams();
  const gender: string = (params as any).gender;

  const [sort, setSort] = useState('date');
  const [by, setBy] = useState('desc');

  const [pageInfo, setPageInfo] = useState<PageData>();

  useEffect(() => {
    if (pageInfo) {
      return;
    }

    const fetchCustomers = async () => {
      const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/customers/gender/${gender}/1/default/default`);
      const data = await response.data;

      if (!data.success) {
        console.log(data.message || 'FETCH_ERROR');
        return;
      }

      setPageInfo(data);
    };

    if (!pageInfo) {
      fetchCustomers();
    }
  }, [pageInfo, setPageInfo, gender]);

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

    const response = await axios(`${process.env.REACT_APP_API_ENDPOINT}/customers/gender/${gender}/${page}/${sort}/${by}`);
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
      const response = await axios(`${process.env.REACT_APP_API_ENDPOINT}/customers/gender/${gender}/${pageInfo.page}/${sort}/${by}`);

      const data = await response.data;

      if (!data) {
        console.log(data.message || 'FETCH_ERROR');
        return;
      }

      setPageInfo(data);
    }
  };

  const label = gender[0].toUpperCase() + gender.slice(1);

  return (
    <div>
      <SearchCustomer />
      <div className='customer-page-detail'>
        <div className='customer-page-detail__title-wrapper'>
          <h1 className='customer-page-detail__title'>{label} Customers</h1>
        </div>

        <div className='customer-page-cards'>
          <div className='card'>
            <h2>Total</h2>
            <p>
              <FontAwesomeIcon icon={faUser} className='card-icon' />
              {pageInfo?.total}
            </p>
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
                Desc
              </option>
              <option value='insc'>Insc</option>
            </select>
          </div>

          <button onClick={sortCustomers}>Sort</button>
        </div>
        {pageInfo?.data && (
          <div>
            <CustomerTable data={pageInfo.data} head={['Name', 'Age', 'Registered', 'Email']} body={['username', 'age', 'dateRegistered', 'email']} />
            <div className='pagination'>
              {pageInfo.pre_page && (
                <button onClick={() => changePage(pageInfo.page - 1)} className='prev-button'>
                  Previous
                </button>
              )}
              {pages &&
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

export default CustomersByGender;

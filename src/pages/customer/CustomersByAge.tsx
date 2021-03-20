import axios from 'axios';
import { useState, useEffect } from 'react';
import { PageData } from './AllCustomers';
import logo from '../../images/avator.png';
import { useParams } from 'react-router';
import { customerReducer } from '../../redux/reducers/customer/customerReducer';
import CustomerTable from '../../components/table/CustomerTable';

export interface CustomerByAgeProps {}

const CustomersByAge: React.FC<CustomerByAgeProps> = (props) => {
  const params = useParams();
  const age: string = (params as any).age;

  const [sort, setSort] = useState('date');
  const [by, setBy] = useState('desc');

  const [pageInfo, setPageInfo] = useState<PageData>();

  useEffect(() => {
    if (pageInfo) {
      return;
    }

    const fetchCustomers = async () => {
      const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/customers/age/${age}/1/default/default`);
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
  }, [pageInfo, setPageInfo, age]);

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

    const response = await axios(`${process.env.REACT_APP_API_ENDPOINT}/customers/age/${age}/${page}/${sort}/${by}`);
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
      const response = await axios(`${process.env.REACT_APP_API_ENDPOINT}/customers/age/${age}/${pageInfo.page}/${sort}/${by}`);

      const data = await response.data;

      if (!data) {
        console.log(data.message || 'FETCH_ERROR');
        return;
      }

      setPageInfo(data);
    }
  };

  let label = '';

  if (age.split('-').length === 2) {
    label = `Customers Aged Between ${age.split('-')[0]} and ${age.split('-')[1]}`;
  } else if (age.includes('>')) {
    label = `Customers Aged Over ${age.split('>')[1]}`;
  } else if (age.includes('<')) {
    label = `Customers Aged Under ${age.split('<')[1]}`;
  }

  return (
    <div>
      <div className='customer-page-detail'>
        <div className='customer-page-detail__title-wrapper'>
          <h1 className='customer-page-detail__title'>{label} </h1>
        </div>
        <div className='sort'>
          <label htmlFor=''>Sort</label>
          <select onChange={(e) => setSort(e.target.value)}>
            <option value='date' defaultChecked>
              Date
            </option>
            <option value='name'>Name</option>
          </select>

          <label htmlFor=''>Order</label>
          <select onChange={(e) => setBy(e.target.value)}>
            <option value='desc' defaultChecked>
              Desc
            </option>
            <option value='insc'>Insc</option>
          </select>

          <button onClick={sortCustomers}>Submit</button>
        </div>
        {pageInfo?.data && (
          <div>
            <CustomerTable data={pageInfo.data} head={['Name', 'Age', 'Registered', 'Email']} body={['username', 'age', 'dateRegistered', 'email']} />

            <div className='pagination'>
              {pageInfo.pre_page && <button onClick={() => changePage(pageInfo.page - 1)}>Previous</button>}
              {pages.length > 1 &&
                pages.map((page) => {
                  return (
                    <button key={page} className={page === pageInfo.page ? 'current_page' : ''} onClick={() => changePage(page)}>
                      {page}
                    </button>
                  );
                })}
              {pageInfo.next_page && <button onClick={() => changePage(pageInfo.page + 1)}>Next</button>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomersByAge;

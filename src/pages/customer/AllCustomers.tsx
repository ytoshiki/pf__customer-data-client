import axios from 'axios';
import { useEffect, useState } from 'react';
import { CustomerData } from './newlyRegistered';
import logo from '../../images/avator.png';
import '../Pagination.scss';
import CustomerTable from '../../components/table/CustomerTable';

export interface AllCustomersProps {}

export interface PageData {
  page: number;
  pre_page: number;
  next_page: number;
  total_page: number;
  per_page: number;
  total: number;
  data: CustomerData[];
}

const AllCustomers: React.SFC<AllCustomersProps> = () => {
  const [sort, setSort] = useState('date');
  const [by, setBy] = useState('desc');

  const [pageInfo, setPageInfo] = useState<PageData>();

  useEffect(() => {
    if (pageInfo) {
      return;
    }

    const fetchCustomers = async () => {
      const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/customers/page/1/default/default`);
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
  }, [pageInfo, setPageInfo]);

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

    const response = await axios(`${process.env.REACT_APP_API_ENDPOINT}/customers/page/${page}/${sort}/${by}`);
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
      const response = await axios(`${process.env.REACT_APP_API_ENDPOINT}/customers/page/${pageInfo.page}/${sort}/${by}`);

      const data = await response.data;

      if (!data) {
        console.log(data.message || 'FETCH_ERROR');
        return;
      }

      setPageInfo(data);
    }
  };

  return (
    <div className='customer-page-detail'>
      <div className='customer-page-detail__title-wrapper'>
        <h1 className='customer-page-detail__title'>All Customers</h1>
      </div>

      <div className='customer-page-cards'>
        <div className='card'>
          <h2>Total Customers</h2>
          <p>{pageInfo?.total}</p>
        </div>
      </div>

      {pageInfo?.data && (
        <div>
          <div className='sort'>
            <div className='sort-block'>
              <label htmlFor=''>Filter by:</label>
              <select onChange={(e) => setSort(e.target.value)}>
                <option value='date' defaultChecked>
                  Date
                </option>
                <option value='name'>Name</option>
              </select>
            </div>

            <div className='sort-block'>
              <label htmlFor=''>Order by:</label>
              <select onChange={(e) => setBy(e.target.value)}>
                <option value='desc' defaultChecked>
                  Desc
                </option>
                <option value='insc'>Insc</option>
              </select>
            </div>

            <button onClick={sortCustomers}>Submit</button>
          </div>
          <CustomerTable data={pageInfo.data} head={['Name', 'Age', 'gender', 'Nat', 'Email', 'Registered']} body={['username', 'age', 'gender', 'nat', 'email', 'dateRegistered']} />

          <div className='pagination'>
            {pageInfo.pre_page && (
              <button onClick={() => changePage(pageInfo.page - 1)} className='prev-button'>
                Previous
              </button>
            )}
            {pages &&
              pages.map((page) => {
                return (
                  <button onClick={() => changePage(page)} key={page} className={page === pageInfo.page ? 'current_page' : ''}>
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
  );
};

export default AllCustomers;

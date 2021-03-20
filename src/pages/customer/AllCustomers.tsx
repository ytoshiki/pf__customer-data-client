import axios from 'axios';
import { useEffect, useState } from 'react';
import { CustomerData } from './newlyRegistered';
import logo from '../../images/avator.png';
import '../Pagination.scss';

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
        <h1 className='customer-page-detail__title'>Customers</h1>
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
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Registered</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {pageInfo.data.map((customer) => (
                <tr key={customer._id}>
                  <td>
                    {customer.avator !== null ? <img src={customer.avator} alt='' style={{ maxWidth: '70px' }} /> : <img src={logo} alt='' style={{ width: '30px' }} />}
                    <span>{customer.username}</span>
                  </td>
                  <td>{customer.dateRegistered}</td>
                  <td>{customer.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className='pagination'>
            {pageInfo.pre_page && <button onClick={() => changePage(pageInfo.page - 1)}>Previous</button>}
            {pages &&
              pages.map((page) => {
                return (
                  <button key={page} className={page === pageInfo.page ? 'current_page' : ''}>
                    {page}
                  </button>
                );
              })}
            {pageInfo.next_page && <button onClick={() => changePage(pageInfo.page + 1)}>Next</button>}
          </div>
        </div>
      )}
    </div>
  );
};

export default AllCustomers;

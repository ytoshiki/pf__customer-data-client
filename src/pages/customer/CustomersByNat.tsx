import axios from 'axios';
import { useState, useEffect } from 'react';
import { PageData } from './AllCustomers';
import { useParams } from 'react-router';
import CustomerTable from '../../components/table/CustomerTable';

export interface CustomerByNatProps {}

const CustomersByNat: React.FC<CustomerByNatProps> = () => {
  const params = useParams();
  const nat: string = (params as any).nat;

  const [sort, setSort] = useState('date');
  const [by, setBy] = useState('desc');

  const [pageInfo, setPageInfo] = useState<PageData>();

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
    };

    if (!pageInfo) {
      fetchCustomers();
    }
  }, [pageInfo, setPageInfo, nat]);

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
      <div className='customer-page-detail'>
        <div className='customer-page-detail__title-wrapper'>
          <h1 className='customer-page-detail__title'>Customers From {label}</h1>
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

export default CustomersByNat;

import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useState } from 'react';
import { useHistory } from 'react-router';
import './SearchCustomer.scss';

export interface SearchCustomerProps {}

const SearchCustomer: React.FC<SearchCustomerProps> = () => {
  const history = useHistory();
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  const fetchById = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/customers/${text.trim()}`);

      const data = await response.data;

      if (!data.success) {
        return false;
      }

      return data.customer;
    } catch (error) {
      return false;
    }
  };

  const fetchByName = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/customers/name/${text.trim()}`);

      const data = await response.data;

      if (!data.success) {
        return false;
      }

      return data.customer;
    } catch (error) {
      return false;
    }
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();

    setError('');

    const result_id = await fetchById();

    if (result_id) {
      return history.push(`${result_id._id}`);
    }

    const result_name = await fetchByName();

    if (!result_name) {
      setError('Could not find any user. Try again.');
      return;
    }

    return history.push(`${result_name._id}`);
  };
  return (
    <div className='searchCustomer'>
      <form onSubmit={onSubmit}>
        <div className='searchCustomer__search'>
          <FontAwesomeIcon icon={faSearch} className='searchCustomer__icon' />
          <input type='text' placeholder="customer's id or name" value={text} onChange={(e) => setText(e.target.value)} />
        </div>
        <button>Search</button>
      </form>

      {error && <span className='searchCustomer__error'>{error}</span>}
    </div>
  );
};

export default SearchCustomer;

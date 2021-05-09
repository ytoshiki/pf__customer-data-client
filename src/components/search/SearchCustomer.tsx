import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './SearchCustomer.scss';

export interface SearchCustomerProps {}

const SearchCustomer: React.FC<SearchCustomerProps> = () => {
  return (
    <div className='searchCustomer'>
      <form>
        <div className='searchCustomer__search'>
          <FontAwesomeIcon icon={faSearch} className='searchCustomer__icon' />
          <input type='text' placeholder="customer's id or name" />
        </div>
        <button>Search</button>
      </form>
    </div>
  );
};

export default SearchCustomer;

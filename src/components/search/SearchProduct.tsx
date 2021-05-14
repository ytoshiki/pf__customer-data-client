import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './SearchCustomer.scss';

export interface SearchProductProps {}

const SearchProduct: React.FC<SearchProductProps> = () => {
  return (
    <div className='searchCustomer'>
      <form>
        <div className='searchCustomer__search'>
          <FontAwesomeIcon icon={faSearch} className='searchCustomer__icon' />
          <input type='text' placeholder="product's id or name" />
        </div>
        <button>Search</button>
      </form>
    </div>
  );
};

export default SearchProduct;

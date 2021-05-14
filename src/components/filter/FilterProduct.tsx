import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import './Filter.scss';

export interface FilterProductProps {}

const FilterProduct: React.FC<FilterProductProps> = () => {
  return (
    <div className='filter-edit'>
      <div className='filter-edit__inner'>
        <form>
          <div className='filter-edit__search'>
            <FontAwesomeIcon icon={faFilter} className='filter-edit__icon' />
            <input type='text' placeholder='filter by name or id' />
          </div>
        </form>
        <button>
          <Link to='/add/product'>Add New</Link>
        </button>
      </div>
    </div>
  );
};

export default FilterProduct;

import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import './Filter.scss';

export interface FilterProductProps {
  text: string;
  setText: (text: string) => void;
}

const FilterProduct: React.FC<FilterProductProps> = ({ text, setText }) => {
  return (
    <div className='filter-edit'>
      <div className='filter-edit__inner'>
        <form>
          <div className='filter-edit__search'>
            <FontAwesomeIcon icon={faFilter} className='filter-edit__icon' />
            <input type='text' placeholder='filter by name or id' value={text} onChange={(e) => setText(e.target.value)} />
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

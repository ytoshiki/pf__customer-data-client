import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

import './Filter.scss';

export interface FilterCategoryProps {
  text: string;
  setText: (text: string) => void;
}

const FilterCategory: React.FC<FilterCategoryProps> = ({ text, setText }) => {
  return (
    <div className='filter-edit'>
      <div className='filter-edit__inner'>
        <div>
          <div className='filter-edit__search'>
            <FontAwesomeIcon icon={faFilter} className='filter-edit__icon' />
            <input type='text' placeholder='filter categories' value={text} onChange={(e) => setText(e.target.value)} />
          </div>
        </div>
        <button>
          <Link to='/add/product'>Add New</Link>
        </button>
      </div>
    </div>
  );
};

export default FilterCategory;

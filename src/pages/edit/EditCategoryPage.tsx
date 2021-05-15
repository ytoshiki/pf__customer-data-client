import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import FilterCategory from '../../components/filter/FilterCategory';
import CategoryTable from '../../components/table/CategoryTable';
import { fetchAllCategories, StoreTypes } from '../../redux';
import { Category } from '../../redux/reducers/category/categoryReducer';

export interface EditCategoryProps {
  categories: Category[];
  fetchCategories: any;
}

const EditCategory: React.FC<EditCategoryProps> = ({ categories, fetchCategories }) => {
  const [text, setText] = useState('');

  useEffect(() => {
    if (categories.length > 0) {
      return;
    }

    fetchCategories();
  }, [categories, fetchCategories]);

  const customCategories = categories.filter((category) => category.name.includes(text.trim()));
  return (
    <>
      <FilterCategory text={text} setText={setText} />
      <div className='edit-product'>{customCategories.length > 0 && <CategoryTable data={customCategories} head={['name', 'image', 'heading', 'paragraph']} body={['name', 'image', 'heading', 'paragraph', 'update', 'delete']} />}</div>
    </>
  );
};

const mapStateToProps = (store: StoreTypes) => {
  return {
    categories: store.categories.categories
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchCategories: () => dispatch(fetchAllCategories())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditCategory);

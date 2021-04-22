import { useEffect } from 'react';
import { connect } from 'react-redux';
import CategoryTable from '../../components/table/CategoryTable';
import ProductTable from '../../components/table/ProductTable';
import { fetchAllCategories, StoreTypes } from '../../redux';
import { Category } from '../../redux/reducers/category/categoryReducer';

export interface EditCategoryProps {
  categories: Category[];
  fetchCategories: any;
}

const EditCategory: React.FC<EditCategoryProps> = ({ categories, fetchCategories }) => {
  useEffect(() => {
    if (categories.length > 0) {
      return;
    }

    fetchCategories();
  }, [categories, fetchCategories]);

  return <div>{categories.length > 0 && <CategoryTable data={categories} head={['name', 'image', 'heading', 'paragraph']} body={['name', 'image', 'heading', 'paragraph', 'update', 'delete']} />}</div>;
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

import CategoryForm from '../components/form/CategoryForm';
import './AddCategory.scss';

export interface AddCategoryPaegProps {}

const AddCategoryPaeg: React.FC<AddCategoryPaegProps> = () => {
  return (
    <div className='addCategory'>
      <div className='addCategory__inner'>
        <CategoryForm />
      </div>
    </div>
  );
};

export default AddCategoryPaeg;

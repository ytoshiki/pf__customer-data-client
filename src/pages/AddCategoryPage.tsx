import CategoryForm from '../components/form/CategoryForm';

export interface AddCategoryPaegProps {}

const AddCategoryPaeg: React.FC<AddCategoryPaegProps> = () => {
  return (
    <div className='add-category'>
      <CategoryForm />
    </div>
  );
};

export default AddCategoryPaeg;

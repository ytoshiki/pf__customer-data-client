import ProductForm from '../components/form/ProductForm';
import './AddProduct.scss';

export interface AddProductProps {}

const AddProduct: React.FC<AddProductProps> = () => {
  return (
    <div className='addProduct'>
      <ProductForm />
    </div>
  );
};

export default AddProduct;

// name: {
//   type: String,
//   required: true,
//   unique: true
// },
// price: {
//   type: Number,
//   required: true
// },
// images: [
//   {
//     type: String,
//     required: true
//   }
// ],
// category: {
//   type: mongoose.Schema.Types.ObjectId,
//   ref: 'Category',
//   required: true
// },

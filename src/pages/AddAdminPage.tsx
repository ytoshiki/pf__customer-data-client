import AdminForm from '../components/form/AdminForm';
import './AddAdmin.scss';

export interface AddAdminProps {}

const AddAdmin: React.FC<AddAdminProps> = () => {
  return (
    <div className='add-admin'>
      <AdminForm />
    </div>
  );
};

export default AddAdmin;

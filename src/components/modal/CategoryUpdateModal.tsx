import { useState } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { updateCategoryById } from '../../redux';
import { CategoryFormData } from '../form/CategoryForm';
import './Modal.scss';

export interface CategoryUpdateModalProps {
  isOpen: boolean;
  setIsOpen: (bool: boolean) => void;
  data: CategoryFormData;
  update: any;
  id: string;
  updateNewCategory: any;
}

Modal.setAppElement('#root');

const CategoryUpdateModal: React.FC<CategoryUpdateModalProps> = ({ isOpen, setIsOpen, data, update, id, updateNewCategory }) => {
  const [error, setError] = useState('');

  return (
    <div>
      <Modal
        isOpen={isOpen}
        style={{
          overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.75)'
          },
          content: {
            position: 'absolute',
            top: '40px',
            left: '400px',
            right: '40px',
            bottom: '40px',
            border: '1px solid #ccc',
            background: '#fff',
            overflow: 'auto',
            WebkitOverflowScrolling: 'touch',
            borderRadius: '4px',
            outline: 'none',
            padding: '20px'
          }
        }}
      >
        <div className='modal-component'>
          {error && error}
          <form
            onSubmit={async (e: any) => {
              e.preventDefault();

              if (!data.heading || !data.image || !data.name) {
                setError('Heading, image, and name are required');
                return;
              }
              const res = await updateNewCategory(id as string, data);
              if (!res) {
                alert('You are not authorised to delete the category. Change the admin account');
              } else {
                alert('Category updated Successfully');
              }
              setIsOpen(false);
            }}
          >
            <div>
              <label>Name</label>
              <input type='text' value={data?.name} onChange={(e) => update({ ...data, name: e.target.value })} />
            </div>
            <div>
              <label>Image</label>
              <input type='text' value={data?.image} onChange={(e) => update({ ...data, image: e.target.value })} />
            </div>
            <div>
              <label>Heading</label>
              <input type='text' value={data?.heading} onChange={(e) => update({ ...data, heading: e.target.value })} />
            </div>
            <div>
              <label>Paragraph</label>
              <input type='text' value={typeof data.paragraph == 'string' ? (data.paragraph as string) : ''} onChange={(e) => update({ ...data, paragraph: e.target.value })} />
            </div>

            <button>Submit</button>
          </form>
        </div>
        <button onClick={() => setIsOpen(false)}>Close</button>
      </Modal>
    </div>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    updateNewCategory: (id: string, form: any) => dispatch(updateCategoryById(id, form))
  };
};

export default connect(null, mapDispatchToProps)(CategoryUpdateModal);

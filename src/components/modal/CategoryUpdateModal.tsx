import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { updateCategoryById } from '../../redux';
import { CategoryFormData } from '../form/CategoryForm';
import './Modal.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { checkImage } from '../../helpers/imageValidate';

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
  const [imageError, setImageError] = useState('');

  return (
    <div>
      <Modal isOpen={isOpen} contentLabel='Example Modal' className='c-modal' overlayClassName='c-modal__overlay'>
        <div className='c-modal__inner'>
          {error && <span className='c-modal__error'>{error}</span>}

          <form
            onSubmit={async (e: any) => {
              e.preventDefault();

              if (!data.heading || !data.image || !data.name) {
                setError('Heading, image, and name are required');
                return;
              }

              const result = await checkImage([data.image]);

              if (!result) {
                return setImageError('Image is invalid');
              }

              const res = await updateNewCategory(id as string, data);
              if (!res) {
                alert('You are not authorised to delete the category. Change the admin account');
              } else {
                alert('Category updated Successfully');
              }
              setIsOpen(false);
            }}
            className='c-modal__form'
          >
            <div className='c-modal__block'>
              <label>Name</label>
              <input type='text' value={data?.name} onChange={(e) => update({ ...data, name: e.target.value })} />
            </div>
            <div className='c-modal__block'>
              <label>Image</label>
              {imageError && <span className='c-modal__error'>{imageError}</span>}
              <input type='text' value={data?.image} onChange={(e) => update({ ...data, image: e.target.value })} />
            </div>
            <div className='c-modal__block'>
              <label>Heading</label>
              <input type='text' value={data?.heading} onChange={(e) => update({ ...data, heading: e.target.value })} />
            </div>
            <div className='c-modal__block'>
              <label>Paragraph</label>
              <input type='text' value={typeof data.paragraph == 'string' ? (data.paragraph as string) : ''} onChange={(e) => update({ ...data, paragraph: e.target.value })} />
            </div>

            <button className='c-modal__submit'>Submit</button>
          </form>
        </div>
        <button onClick={() => setIsOpen(false)} className='c-modal__close'>
          <FontAwesomeIcon icon={faTimes} />
        </button>
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

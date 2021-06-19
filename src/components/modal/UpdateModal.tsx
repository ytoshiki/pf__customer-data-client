import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';

import Modal from 'react-modal';
import { connect } from 'react-redux';
import { checkImage } from '../../helpers/imageValidate';
import { fetchAllCategories, StoreTypes, updateProduct } from '../../redux';
import { ProductFormData } from '../form/ProductForm';
import './Modal.scss';

export interface UpdateModalProps {
  isOpen: boolean;
  setIsOpen: (bool: boolean) => void;
  data: ProductFormData;
  update?: any;
  id?: string;
  categories: {
    id: string;
    name: string;
  }[];
  fetchCategories: any;
  updateNewProduct: any;
}

Modal.setAppElement('#root');

const UpdateModal: React.FC<UpdateModalProps> = ({ isOpen, setIsOpen, data, update, categories, fetchCategories, updateNewProduct, id }) => {
  const [error, setError] = useState('');
  const [imageError, setImageError] = useState('');

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <div>
      <Modal isOpen={isOpen} contentLabel='Example Modal' className='c-modal' overlayClassName='c-modal__overlay'>
        <div className='c-modal__inner'>
          {error && <span className='c-modal__error'>{error}</span>}
          <form
            onSubmit={async (e) => {
              e.preventDefault();

              setImageError('');

              if (!data.name || !data.price || !data.category) {
                return setError('Name, price, and category are required');
              }

              if (!data.images.img1 && !data.images.img2) {
                return setError('At least one image is required');
              }

              categories.forEach((category) => {
                if (category.name === data?.category) {
                  data.category = category.id;
                }
              });

              const result = await checkImage([data.images.img1, data.images.img2]);

              if (!result) {
                return setImageError('Either image is invalid');
              }
              const res = await updateNewProduct(id, data);
              if (!res) {
                alert('You are not authorised to delete the product. Change the admin account');
              } else {
                alert('Product updated Successfully');
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
              <label>
                Price <small> * put number only. $ is included already.</small>
              </label>
              <input type='text' value={data?.price} onChange={(e) => update({ ...data, price: e.target.value })} />
            </div>
            <div className='c-modal__block'>
              <label>
                Images <small> * put image urls</small>
                {imageError && <span className='c-modal__error'>{imageError}</span>}
              </label>
              <input
                value={data?.images.img1}
                onChange={(e) =>
                  update({
                    ...data,
                    images: {
                      ...data?.images,
                      img1: e.target.value
                    }
                  })
                }
              />

              <input
                value={data?.images.img2 || ''}
                onChange={(e) =>
                  update({
                    ...data,
                    images: {
                      ...data?.images,
                      img2: e.target.value
                    }
                  })
                }
                className='second'
              />
            </div>
            <div className='c-modal__block'>
              <label htmlFor=''>Category</label>
              {categories.length && (
                <select
                  value={data?.category}
                  onChange={(e) =>
                    update({
                      ...data,
                      category: e.target.value
                    })
                  }
                >
                  <option disabled>Select Category</option>
                  {categories.map((category, index) => {
                    if (category.name === data?.category) {
                      return (
                        <option key={category.id} value={category.id} defaultChecked>
                          {category.name}
                        </option>
                      );
                    }
                    return (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    );
                  })}
                </select>
              )}
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

const mapStateToProps = (store: StoreTypes) => {
  return {
    categories: store.categories.categories
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchCategories: () => dispatch(fetchAllCategories()),
    updateNewProduct: (id: string, form: ProductFormData) => dispatch(updateProduct(id, form))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateModal);

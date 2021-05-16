import { useEffect, useState } from 'react';
import { Img } from 'react-image';
import Modal from 'react-modal';
import { connect } from 'react-redux';
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

  useEffect(() => {
    if (categories.length > 0) {
      return;
    }

    fetchCategories();
  }, [categories, fetchCategories]);

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
            onSubmit={async (e) => {
              e.preventDefault();

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

              const res = await updateNewProduct(id, data);
              if (!res) {
                alert('You are not authorised to delete the product. Change the admin account');
              } else {
                alert('Product updated Successfully');
              }
              setIsOpen(false);
            }}
          >
            <div>
              <label>Name</label>
              <input type='text' value={data?.name} onChange={(e) => update({ ...data, name: e.target.value })} />
            </div>
            <div>
              <label>Price</label>
              <input type='text' value={data?.price} onChange={(e) => update({ ...data, price: e.target.value })} />
            </div>
            <div>
              <label>Images</label>
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
              ;
              <input
                value={data?.images.img2}
                onChange={(e) =>
                  update({
                    ...data,
                    images: {
                      ...data?.images,
                      img2: e.target.value
                    }
                  })
                }
              />
              ;
            </div>
            <div>
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
            <button>Submit</button>
          </form>
        </div>
        <button onClick={() => setIsOpen(false)}>Close</button>
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

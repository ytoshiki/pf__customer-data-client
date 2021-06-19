import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { Img } from 'react-image';
import Modal from 'react-modal';
import './Modal.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface ProductModalProps {
  isOpen: boolean;
  setIsOpen: (bool: boolean) => void;
  data: {
    name: string;
    price: string;
    images: {
      img1: string;
      img2: string;
    };
    category: string;
  };
  comfirm: any;
}

Modal.setAppElement('#root');

const ProductModal: React.FC<ProductModalProps> = ({ isOpen, setIsOpen, data, comfirm }) => {
  // const [category, setCategory] = useState('');

  // useEffect(() => {
  //   if (!data || category) {
  //     return;
  //   }

  //   const getCategoryName = async () => {
  //     try {
  //     } catch (error) {}
  //   };
  // }, [data, category, setCategory]);

  return (
    <div>
      <Modal isOpen={isOpen} contentLabel='Example Modal' className='c-modal' overlayClassName='c-modal__overlay'>
        <div className='c-modal__inner'>
          <ul>
            <li>
              <span className='c-modal__title'>Name:</span>
              {data.name}
            </li>
            <li>
              <span className='c-modal__title'>Price:</span>${data.price}
            </li>
            <li>
              <span className='c-modal__title'>Category:</span>
              {data.category}
            </li>
          </ul>
          <div>
            <span className='c-modal__title'>Images:</span>

            <ul>
              <li className='image-container'>
                <span>1.</span>
                <Img src={data.images.img1} alt={data.name} loader={<img src='https://media.giphy.com/media/3o7bu6GcdJw1k6b6h2/giphy.gif' alt='' />} unloader={<span>No Image</span>} />
              </li>
              <li className='image-container'>
                <span>2.</span>
                <Img src={data.images.img2} alt={data.name} loader={<img src='https://media.giphy.com/media/3o7bu6GcdJw1k6b6h2/giphy.gif' alt='' />} unloader={<span>No image</span>} />
              </li>
            </ul>
          </div>
          <button
            onClick={() => {
              comfirm();
              setIsOpen(false);
            }}
            className='c-modal__submit'
          >
            Comfirm
          </button>
        </div>
        <button onClick={() => setIsOpen(false)} className='c-modal__close'>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </Modal>
    </div>
  );
};

export default ProductModal;

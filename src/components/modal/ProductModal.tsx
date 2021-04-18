import { useEffect, useState } from 'react';
import { Img } from 'react-image';
import Modal from 'react-modal';
import './Modal.scss';

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
  const [category, setCategory] = useState('');

  useEffect(() => {
    if (!data || category) {
      return;
    }

    const getCategoryName = async () => {
      try {
      } catch (error) {}
    };
  }, [data, category, setCategory]);

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
          <ul>
            <li>Name: {data.name}</li>
            <li>Price: ${data.price}</li>
            <li>Category: {data.category}</li>
          </ul>
          <div>
            <p>Images</p>
            <ul>
              <li className='image-container'>
                <span>Image One</span>
                <Img src={data.images.img1} alt={data.name} loader={<img src='https://media.giphy.com/media/3o7bu6GcdJw1k6b6h2/giphy.gif' alt='' />} unloader={<p>Image Not Found From {data.images.img1}</p>} />
              </li>
              <li className='image-container'>
                <span>Image Two</span>
                <Img src={data.images.img2} alt={data.name} loader={<img src='https://media.giphy.com/media/3o7bu6GcdJw1k6b6h2/giphy.gif' alt='' />} unloader={<p>Image Not Found From {data.images.img2}</p>} />
              </li>
            </ul>
          </div>
        </div>
        <button onClick={() => setIsOpen(false)}>Close</button>
        <button
          onClick={() => {
            comfirm();
            setIsOpen(false);
          }}
        >
          Comfirm
        </button>
      </Modal>
    </div>
  );
};

export default ProductModal;

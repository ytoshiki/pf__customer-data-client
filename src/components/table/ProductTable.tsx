import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { dateFormatter, generateKey } from '../../helpers';
import { Product } from '../../pages/ProductPage';
import { deleteProduct } from '../../redux';
import { ProductFormData } from '../form/ProductForm';
import UpdateModal from '../modal/UpdateModal';
import './ProductTable.scss';

export interface ProductTableProps {
  data: any[];
  head: string[];
  body: string[];
  hover?: boolean;
  link?: boolean;
  deleteAProduct: any;
}

const ProductTable: React.SFC<ProductTableProps> = ({ data, head, body, hover, link, deleteAProduct }) => {
  const history = useHistory();

  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState('');
  const [result, setResult] = useState('');

  const resultMsg = {
    success: 'Product successfully deleted',
    fail: 'You are not authorized to delete product. Switch the admin account.'
  };

  const [updateData, setUpdateData] = useState<ProductFormData>({
    name: '',
    price: '',
    images: {
      img1: '',
      img2: ''
    },
    category: ''
  });

  const onClick = (id: string) => {
    if (!link) return;
    history.push(`/products/${id}`);
  };

  const deleteProduct = async (id: string) => {
    const result = window.confirm('Want to delete?');
    if (!result) return;

    // Check authority

    const response = await deleteAProduct(id);
    if (!response) return setResult(resultMsg.fail);
    return setResult(resultMsg.success);
  };

  const updateProduct = (obj: Product) => {
    setUpdateData({
      ...updateData,
      name: obj.name,
      price: String(obj.price),
      images: {
        img1: obj.images[0],
        img2: obj.images[1]
      },
      category: obj.category
    });
    setId(obj.id || (obj as any)._id);
    setIsOpen(true);
  };

  return (
    <>
      <UpdateModal isOpen={isOpen} setIsOpen={setIsOpen} data={updateData} update={setUpdateData} id={id} />
      <div className='productTable__result'>
        <p className={result === resultMsg.success ? 'is-success' : 'is-fail'}>{result}</p>
      </div>
      <table className='productTable'>
        <thead>
          <tr>
            {head.map((th, index) => (
              <th key={generateKey(String(index))}>{th}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((obj, index) => (
            <tr key={generateKey(String(index))} onClick={() => onClick(obj._id || obj.id)} className={hover ? 'is-hover' : ''}>
              {body.map((td, index) => {
                if (td === 'createdAt' || td === 'dateRegistered') {
                  let date;

                  let key = 'dateRegistered';

                  if (td === 'createdAt') {
                    key = 'createdAt';
                  }

                  date = dateFormatter(obj[key]);

                  return <td key={generateKey(String(index))}>{date}</td>;
                } else if (td === 'images') {
                  return (
                    <td key={generateKey(String(index))}>
                      <div className='image-wrapper'>
                        <img src={obj['images'][0]} alt='' />
                      </div>
                    </td>
                  );
                } else if (td === 'category') {
                  return <td key={generateKey(String(index))}>{obj[td] ? obj[td].name : 'None'}</td>;
                } else if (td === 'category_row') {
                  return <td key={generateKey(String(index))}>{obj['category']}</td>;
                } else if (td === 'update') {
                  return (
                    <td key={generateKey(String(index))} onClick={() => updateProduct(obj)}>
                      <FontAwesomeIcon icon={faEdit} color='grey' />
                    </td>
                  );
                } else if (td === 'delete') {
                  return (
                    <td key={generateKey(String(index))} onClick={() => deleteProduct(obj._id || obj.id)}>
                      <FontAwesomeIcon icon={faTrash} color='#d11a2a' />
                    </td>
                  );
                } else {
                  return <td key={generateKey(String(index))}>{obj[td]}</td>;
                }
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    deleteAProduct: (id: string) => dispatch(deleteProduct(id))
  };
};

export default connect(null, mapDispatchToProps)(ProductTable);

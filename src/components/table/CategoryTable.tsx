import { useHistory } from 'react-router-dom';
import { dateFormatter, generateKey } from '../../helpers';
import { Img } from 'react-image';
import './CategoryTable.scss';
import { connect } from 'react-redux';
import { deleteCategoryById } from '../../redux';
import CategoryUpdateModal from '../modal/CategoryUpdateModal';
import { useState } from 'react';
import { CategoryFormData } from '../form/CategoryForm';
import { Category } from '../../redux/reducers/category/categoryReducer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

export interface CategoryTableProps {
  data: any[];
  head: string[];
  body: string[];
  deleteCategory?: any;
}

const CategoryTable: React.FC<CategoryTableProps> = ({ data, head, body, deleteCategory }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState('');

  const [updateData, setUpdateData] = useState<CategoryFormData>({
    name: '',
    image: '',
    heading: '',
    paragraph: ''
  });

  const deleteTheCategory = (id: string) => {
    const result = window.confirm('Want to delete?');
    if (!result) return;

    const success = deleteCategory(id);
    if (!success) console.log('DELETE FAILED');
    console.log('DELETE SUCCEEDED');
  };

  const updateCategory = (obj: Category) => {
    setUpdateData({
      ...updateData,
      name: obj.name,
      image: obj.image,
      heading: obj.heading,
      paragraph: obj.paragraph
    });
    setId(obj.id || (obj as any)._id);
    setIsOpen(true);
  };

  return (
    <>
      <CategoryUpdateModal isOpen={isOpen} setIsOpen={setIsOpen} data={updateData} update={setUpdateData} id={id} />
      <table className='category-table'>
        <thead>
          <tr>
            {head.map((th, index) => (
              <th key={generateKey(String(index))}>{th}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((obj, index) => (
            <tr key={generateKey(String(index))}>
              {body.map((td, index) => {
                if (td === 'createdAt' || td === 'dateRegistered') {
                  let date;

                  let key = 'dateRegistered';

                  if (td === 'createdAt') {
                    key = 'createdAt';
                  }

                  date = dateFormatter(obj[key]);

                  return <td key={generateKey(String(index))}>{date}</td>;
                } else if (td === 'image') {
                  return (
                    <td key={generateKey(String(index))} className='image-container'>
                      <Img src={obj['image']} alt={obj['name'] || ''} loader={<img src='https://media.giphy.com/media/3o7bu6GcdJw1k6b6h2/giphy.gif' alt='' />} unloader={<p>Image Not Found</p>} />
                    </td>
                  );
                } else if (td === 'update') {
                  return (
                    <td key={generateKey(String(index))} onClick={() => updateCategory(obj)}>
                      <FontAwesomeIcon icon={faEdit} color='grey' />
                    </td>
                  );
                } else if (td === 'delete') {
                  return (
                    <td key={generateKey(String(index))} onClick={() => deleteTheCategory(obj.id)}>
                      <FontAwesomeIcon icon={faTrash} color='#d11a2a' />
                    </td>
                  );
                } else if (td === 'paragraph' && !obj.paragraph) {
                  return <td key={generateKey(String(index))}>None</td>;
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
    deleteCategory: (id: string) => dispatch(deleteCategoryById(id))
    // updateCategory: (id: string) => dispatch(updateCategoryById)
  };
};

export default connect(null, mapDispatchToProps)(CategoryTable);

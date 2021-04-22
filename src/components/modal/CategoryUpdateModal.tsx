import { useEffect, useState } from 'react';
import { Img } from 'react-image';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import {} from '../../redux';
import { CategoryFormData } from '../form/CategoryForm';
import './Modal.scss';

export interface CategoryUpdateModalProps {
  isOpen: boolean;
  setIsOpen: (bool: boolean) => void;
  data?: CategoryFormData;
  update?: any;
  id?: string;
}

Modal.setAppElement('#root');

const CategoryUpdateModal: React.SFC<CategoryUpdateModalProps> = () => {
  return <div></div>;
};

export default CategoryUpdateModal;

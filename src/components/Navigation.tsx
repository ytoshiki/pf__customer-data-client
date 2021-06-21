import { useState, useRef } from 'react';
import './Navigation.scss';
import { faUser, faImage, faEdit, faPlus, faChevronDown, faChevronUp, faQuestionCircle, faCompressAlt, faExpandAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { StoreTypes, logOutAdmin } from '../redux';
import { Admin } from '../redux/reducers/admin/adminReducer';
import { Rnd } from 'react-rnd';
import Logo from '../images/logo.png';

export interface NavigationProps {
  admin: Admin;
  logoutAdmin: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ admin, logoutAdmin }) => {
  const navRef = useRef<HTMLElement>(null);

  const [navClass, setNavClass] = useState({
    visualization: false,
    edit: false,
    add: false
  });

  const [resize, setResize] = useState(false);

  const onClick = (target: string) => {
    const lists = navRef.current?.querySelectorAll('.target');
    console.log('clicked', lists);
    lists?.forEach((list: any) => {
      if (list.dataset.tag === target) {
        setNavClass({
          // ...navClass,
          // [list.dataset.tag]: !navClass[(target as 'visualization') || 'edit' || 'add']
          ...navClass,
          [list.dataset.tag]: !navClass[(list.dataset.tag as 'visualization') || 'edit' || 'add']
        });
      }
    });
  };

  const onClickLogout = () => {
    const result = window.confirm('Do you want to log out?');

    if (!result) return;

    logoutAdmin();
  };

  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        top: 0,

        width: 'auto',
        height: '100%',
        zIndex: 999999
      }}
    >
      <Rnd
        default={{
          x: 0,
          y: 0,
          width: 240,
          height: '100%'
        }}
        disableDragging
        minWidth={48}
        minHeight='100%'
        bounds='body'
      >
        <nav className={`navigation ${resize ? 'hide' : ''}`} ref={navRef}>
          <div className='navigation__option'>
            <div className='navigation__image'>
              <Link to='/'>
                <img src={Logo} alt='' />
              </Link>
            </div>{' '}
            <FontAwesomeIcon icon={!resize ? faCompressAlt : faExpandAlt} />
          </div>
          <div className='navigation__admin'>
            <div className='navigation__admin-inner'>
              <FontAwesomeIcon icon={faUser} className='icon' />
              <p>
                {' '}
                Logged In With <span>{admin.name}</span> <FontAwesomeIcon icon={faQuestionCircle} className='sub-icon' />
              </p>
              <br />
              <button className='navigation__admin-logout' onClick={onClickLogout}>
                Log Out
              </button>
            </div>
          </div>
          <ul className='navigation__list'>
            <li className='label' onClick={() => onClick('visualization')}>
              <FontAwesomeIcon icon={faImage} color='#fff' />
              <span>Visualization</span>
              <FontAwesomeIcon icon={navClass.visualization ? faChevronUp : faChevronDown} color='#fff' className='icon' />
            </li>
            <li className={`${navClass.visualization ? 'visible' : 'hidden'} target`} data-tag='visualization'>
              <ul className='navigation__menu'>
                <li className='navigation__menu-item active'>
                  <Link to='/' className='navigation__menu-link'>
                    {/* <div>
                  <img src={UserLogo} alt='' />
                </div> */}

                    <small>Customer</small>
                  </Link>
                </li>
                <li className='navigation__menu-item'>
                  <Link to='/products' className='navigation__menu-link'>
                    {/* <div>
                  <img src={ProductLogo} alt='' />
                </div> */}

                    <small>Product</small>
                  </Link>
                </li>
                <li className='navigation__menu-item'>
                  <Link to='/profit' className='navigation__menu-link'>
                    {/* <div>
                  <img src={ItemLogo} alt='' />
                </div> */}
                    <small>Profit</small>
                  </Link>
                </li>
              </ul>
            </li>
            <li className='label' onClick={() => onClick('edit')}>
              <FontAwesomeIcon icon={faEdit} color='#fff' />
              <span>EDIT</span>
              <FontAwesomeIcon icon={navClass.edit ? faChevronUp : faChevronDown} color='#fff' className='icon' />
            </li>
            <li className={`${navClass.edit ? 'visible' : 'hidden'} target`} data-tag='edit'>
              <ul className='navigation__menu'>
                <li className='navigation__menu-item'>
                  <Link to='/edit/category' className='navigation__menu-link'>
                    {/* <div>
                  <img src={ProductLogo} alt='' />
                </div> */}
                    <small>Category</small>
                  </Link>
                </li>
                <li className='navigation__menu-item'>
                  <Link to='/edit/product' className='navigation__menu-link'>
                    {/* <div>
                  <img src={ProductLogo} alt='' />
                </div> */}
                    <small>Product</small>
                  </Link>
                </li>
              </ul>
            </li>
            <li className='label' onClick={() => onClick('add')}>
              <FontAwesomeIcon icon={faPlus} color='#fff' />
              <span>ADD</span>
              <FontAwesomeIcon icon={navClass.add ? faChevronUp : faChevronDown} color='#fff' className='icon' />
            </li>
            <li className={`${navClass.add ? 'visible' : 'hidden'} target`} data-tag='add'>
              <ul className='navigation__menu'>
                {/* <li className='navigation__menu-item'>
                  <Link to='/register' className='navigation__menu-link'>
                   
                    <small>Admin</small>
                  </Link>
                </li> */}
                <li className='navigation__menu-item'>
                  <Link to='/add/category' className='navigation__menu-link'>
                    {/* <div>
                  <img src={ProductLogo} alt='' />
                </div> */}
                    <small>Category</small>
                  </Link>
                </li>
                <li className='navigation__menu-item'>
                  <Link to='/add/product' className='navigation__menu-link'>
                    {/* <div>
                  <img src={ProductLogo} alt='' />
                </div> */}
                    <small>Product</small>
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </Rnd>
    </div>
  );
};

const mapStateToProps = (store: StoreTypes) => {
  return {
    admin: store.admin
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    logoutAdmin: () => dispatch(logOutAdmin())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Navigation);

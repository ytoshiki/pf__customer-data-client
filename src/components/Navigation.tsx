import { useEffect, useState, useRef } from 'react';
import './Navigation.scss';

import { Link } from 'react-router-dom';

export interface NavigationProps {}

const Navigation: React.FC<NavigationProps> = () => {
  const navRef = useRef<HTMLElement>(null);

  return (
    <nav className='navigation' ref={navRef}>
      <ul className='navigation__list'>
        <li className='label'>Visit Site</li>
        <li className='label'>Alalytics</li>
        <li>
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
        <li className='label'>EDIT</li>
        <li>
          <ul className='navigation__menu'>
            <li className='navigation__menu-item'>
              <Link to='/add/product' className='navigation__menu-link'>
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
        <li className='label'>ADD</li>
        <li>
          <ul className='navigation__menu'>
            <li className='navigation__menu-item'>
              <Link to='/register' className='navigation__menu-link'>
                {/* <div>
                  <img src={ProductLogo} alt='' />
                </div> */}
                <small>Admin</small>
              </Link>
            </li>
            <li className='navigation__menu-item'>
              <Link to='/register' className='navigation__menu-link'>
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
  );
};

export default Navigation;

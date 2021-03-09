import { useEffect, useState, useRef } from 'react';
import './Navigation.scss';

import { Link } from 'react-router-dom';

export interface NavigationProps {}

const Navigation: React.FC<NavigationProps> = () => {
  const [darkmode, setDarkmode] = useState(true);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // For graph container on customer page
    const containers = [];
    containers.push(document.querySelector('.customerpage__left') as HTMLElement);
    const elements = document.querySelectorAll('.bar-chart') as NodeListOf<HTMLElement>;
    elements.forEach((element: HTMLElement) => {
      containers.push(element);
    });
    containers.push(document.querySelector('.ranking-chart') as HTMLElement);

    // Active list

    if (darkmode) {
      document.body.style.background = '#373737';
      document.body.style.color = '#fff';

      if (containers[0].classList.contains('white')) {
        containers.forEach((container) => {
          container.classList.toggle('white');
        });
      }

      if (navRef.current !== null) {
        if (navRef.current.classList.contains('active-nav')) {
          navRef.current.classList.toggle('active-nav');
        }
      }
    } else {
      document.body.style.background = '#f2f2f2';
      document.body.style.color = '#202529';

      if (containers) {
        containers.forEach((container) => {
          container.classList.toggle('white');
        });
      }

      if (navRef.current !== null) {
        navRef.current.classList.toggle('active-nav');
      }
    }
  }, [darkmode]);

  return (
    <nav className='navigation' ref={navRef}>
      <ul className='navigation__list'>
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
              <Link to='/product' className='navigation__menu-link'>
                {/* <div>
                  <img src={ProductLogo} alt='' />
                </div> */}
                <small>Product</small>
              </Link>
            </li>
            <li className='navigation__menu-item'>
              <Link to='/product' className='navigation__menu-link'>
                {/* <div>
                  <img src={ItemLogo} alt='' />
                </div> */}
                <small>Profit</small>
              </Link>
            </li>
          </ul>
        </li>
        <li className='navigation__mode'>
          <label className='switch'>
            <input
              type='checkbox'
              onClick={() => {
                setDarkmode(!darkmode);
              }}
            />
            <span className='slider round'></span>
          </label>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;

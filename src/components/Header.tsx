import './Header.scss';

export interface HeaderProps {
  category: string;
}

const Header: React.FC<HeaderProps> = ({ category }) => {
  return (
    <header className='header'>
      <h1>{category.toUpperCase()} ANALYTICS</h1>
    </header>
  );
};

export default Header;

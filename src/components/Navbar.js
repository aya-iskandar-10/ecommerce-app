import { NavLink } from 'react-router-dom';
import { SearchBar } from './SearchBar';
import { useCart } from '../context/CartContext';

const navItems = [
  ['Home', '/'],
  ['Categories', '/categories'],
  ['Products', '/products'],
];

export function Navbar() {
  const { itemCount } = useCart();
  return (
    <header className="site-header">
      <div className="announcement">Fresh finds, thoughtful prices, delivered simply.</div>
      <div className="nav-wrap">
        <NavLink className="brand" to="/" aria-label="Houpla home"><span className="brand-mark">H</span><span>Houpla<span className="brand-dot">.</span></span></NavLink>
        <nav className="primary-nav" aria-label="Primary navigation">
          {navItems.map(([label, path]) => <NavLink key={path} to={path} className={({ isActive }) => isActive ? 'active' : ''} end={path === '/'}>{label}</NavLink>)}
        </nav>
        <div className="nav-actions"><SearchBar /><NavLink className="nav-link nav-link--account" to="/profile">Account</NavLink><NavLink className="cart-link" to="/cart">Cart <span>{itemCount}</span></NavLink></div>
      </div>
    </header>
  );
}

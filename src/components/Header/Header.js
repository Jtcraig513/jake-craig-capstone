import { Link, NavLink } from 'react-router-dom';
import './Header.scss';

function Header() {
    return (
        <header className='header'>
            <Link className='header__logo' to='/'>
                <h2 className='header__logo-txt'>StreamFinder</h2>
            </Link>
            <nav className='header__nav'>
                <NavLink to='/' className={(navData) => navData.isActive
                    ? 'header__nav-link header__nav-link--active'
                    : 'header__nav-link' }
                    exact='true'>
                    <h3 className='header__nav-item'>Search</h3>
                </NavLink>
                
                <NavLink to='/collection' className={(navData) => navData.isActive
                    ? 'header__nav-link header__nav-link--active'
                    : 'header__nav-link' }
                    exact='true'>
                    <h3 className='header__nav-item'>Collection</h3>
                </NavLink>

                <NavLink to='/profile' className={(navData) => navData.isActive
                    ? 'header__nav-link header__nav-link--active'
                    : 'header__nav-link' }
                    exact='true'>
                    <h3 className='header__nav-item'>Profile</h3>
                </NavLink>
            </nav>
        </header>
    );
}

export default Header;
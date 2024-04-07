import { NavLink } from 'react-router-dom';
import './Header.scss';

function Header() {
    return (
        <header className='header'>
            <img className='header__logo' src='' alt='logo'/>
            <nav className='header__nav'>
                <NavLink to='' className='header__nav-link'>
                    <h3 className='header__nav-item'>Search</h3>
                </NavLink>
                <NavLink to='' className='header__nav-link'>
                    <h3 className='header__nav-item'>Collection</h3>
                </NavLink>
                <NavLink to='' className='header__nav-link'>
                    <h3 className='header__nav-item'>Login</h3>
                </NavLink>
                <NavLink to='' className='header__nav-link'>
                    <h3 className='header__nav-item'>Profile</h3>
                </NavLink>
            </nav>
        </header>
    );
}

export default Header;
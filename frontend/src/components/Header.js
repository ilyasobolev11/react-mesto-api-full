import React, { useContext } from 'react';
import { Route, Link } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import logo from '../images/logo.svg';

function Header({onLogoutClick}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <header className="header root__header">
      <Link to="/" className="header__logo-link">
        <img src={logo} className="header__logo" alt="логотип" />
      </Link>
      <nav>
        <ul className="header__navbar">
          <Route path="/sign-up">
            <li><Link to="/sign-in" className="header__nav-link">Войти</Link></li>
          </Route>
          <Route path="/sign-in">
            <li><Link to="/sign-up" className="header__nav-link">Регистрация</Link></li>
          </Route>
          <Route path="/" exact>
            <li><span className="header__nav-user-info">{currentUser?.email}</span></li>
            <li><button className="header__exit-btn" onClick={onLogoutClick}>Выйти</button></li>
          </Route>
        </ul>
      </nav>
    </header>
  );
}

export default Header;

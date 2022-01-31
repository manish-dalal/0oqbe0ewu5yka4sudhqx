import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import './header.css';

export default function Header() {
  return (
    <header className='app-header'>
      <div className='container'>
        <Link to='/'>
          <img
            src='https://res.cloudinary.com/ddvaiwvwr/image/upload/v1642945652/fdisk.in/logo-header-min_ozocct.png'
            alt='logo'
            className='header-logo'
          />
        </Link>
        <div>
          <Link to='/contact'>Contact</Link>
        </div>
      </div>
    </header>
  );
}

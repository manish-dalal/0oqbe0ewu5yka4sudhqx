import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer>
      <Link className='link' to='/term-and-condition'>
        Terms of Use
      </Link>
      <Link className='link' to='/privacy-policy'>
        Privacy Policy
      </Link>
      <Link className='link' to='/disclaimer'>
        Disclaimer
      </Link>
      <Link className='link' to='/contact'>
        Contact
      </Link>
    </footer>
  );
}

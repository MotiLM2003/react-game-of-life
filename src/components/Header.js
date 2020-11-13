import React from 'react';
import logo from '../images/logo-1.png';

const Header = () => {
  return (
    <header className='header'>
      <div className='logo-container contaienr'>
        <img src={logo} className='logo' />
        <h1>Conway's Game of Life</h1>
      </div>
    </header>
  );
};
export default Header;

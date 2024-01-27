import React from 'react';
import H from './Header.module.css'
import headerImg from './Header.png'
const Header = () => {
    return <header className={H.header}>
    <img src={headerImg}/>
  </header>
}
export default Header;
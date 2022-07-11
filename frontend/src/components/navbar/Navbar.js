import React from 'react';
import './style.css'
const Navbar = () => {
  return (
    <>
      <div className="topnav" id="myTopnav">
        <div className='logo'>
          <a href="/" >كولكتي</a>
        </div>
        <div className='items'>
          <a href="/news">خدمات</a>
          <a href="/contact">إتصال</a>
          <a href='/signup' className='active'>تسجيل حساب</a>
        </div>
      </div>
    </>
  );
};

export default Navbar;
import React from 'react'
import LeftSide from '../components/leftside/Leftside'
import Navbar from '../components/navbar/Navbar'
import RightSide from '../components/rightside/Rightside'
import './home.css'

const Home = () => {
  return (
    <>
      <Navbar/>
      <div className='container'>
          <div className='rowC'>
              <LeftSide/>
              <RightSide />
          </div>
      </div>
    </>
  )
}

export default Home
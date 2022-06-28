import React from 'react'
import LeftSide from '../components/leftside/Leftside'
import Navbar from '../components/navbar/Navbar'
import RightSide from '../components/rightside/Rightside'

const Home = () => {
  return (
    <div>
        <Navbar/>
        <LeftSide/>
        <RightSide />
    </div>
  )
}

export default Home
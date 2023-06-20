import React from 'react'
import './reissuebooks.css'
import Sidebar from '../../components/Sidebar'
import Navbar from '../../components/Navbar'
import Maincontent from './Maincontent';
const ReissueBooks = ({onLogout,token}) => {
  return (
    <div className="container" >
      <Navbar />
      <div className="content">
        <Sidebar onLogout={onLogout}/>
        <Maincontent token={token}/>
      </div>
    </div>
  )
}

export default ReissueBooks
import React from 'react'
import './addbooks.css'
import Sidebar from '../../components/Sidebar'
import Navbar from '../../components/Navbar'
import Maincontent from './Maincontent';
const AddBooks = () => {
  return (
    <div className="container" style={{display:'flex'}}>
      <Navbar />
      <div className="content">
        <Sidebar/>
        <Maincontent/>
      </div>
    </div>
  )
}

export default AddBooks
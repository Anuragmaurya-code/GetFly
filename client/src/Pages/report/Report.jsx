import React from 'react'
import './report.css'
import Sidebar from '../../components/Sidebar'
import Navbar from '../../components/Navbar'
import Maincontent from './Maincontent';
const report = () => {
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

export default report

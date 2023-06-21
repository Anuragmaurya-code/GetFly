import React from 'react'
import './reissuebooks.css'
import Sidebar from '../../components/Sidebar'
import Navbar from '../../components/Navbar'
import Maincontent from './Maincontent';
const ReissueBooks = ({ onLogout, token ,user}) => {
  return (
    <div className="container" style={{display:'flex'}}>
      <Navbar user={user}/>
        <div className="content">
          <Sidebar onLogout={onLogout} />
          <Maincontent token={token} name={user.name} sid={user.sid}/>
        </div>
      </div>

  )
}

export default ReissueBooks
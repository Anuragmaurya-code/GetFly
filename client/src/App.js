import { Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './Pages/dashboard/Dashboard'
import Login from './Pages/login/Login'
import AddBooks from './Pages/addbooks/AddBooks'
import IssueBooks from './Pages/issuebooks/IssueBooks'
import ReissueBooks from './Pages/reissuebooks/ReissueBooks'
import Report from './Pages/report/Report'
function App() {
  return (
    <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/addbooks' element={<AddBooks />} />
        <Route path='/issuebooks' element={<IssueBooks/>} />
        <Route path='/reissuebooks' element={<ReissueBooks/>} />
        <Route path='/report' element={<Report/>} />
    </Routes>

    
  );
}

export default App;

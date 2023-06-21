import { useState, useEffect } from 'react';
import { useRoutes, Navigate, useNavigate } from 'react-router-dom';
import './App.css';
import Dashboard from './Pages/dashboard/Dashboard';
import Login from './Pages/login/Login';
import AddBooks from './Pages/addbooks/AddBooks';
import IssueBooks from './Pages/issuebooks/IssueBooks';
import ReissueBooks from './Pages/reissuebooks/ReissueBooks';
import Report from './Pages/report/Report';
import Signup from './Pages/signup/Signup';
const localStorage = window.localStorage;
const App = () => {
  const [token, setToken] = useState(() => localStorage.getItem('token') || null);
  const [userInfo, setUserInfo] = useState(() => JSON.parse(localStorage.getItem('userInfo')) || null);
  const isAuthenticated = !!token;

  useEffect(() => {
    // Save token and userInfo to localStorage when they change
    if (token) {
      localStorage.setItem('token', token);
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('userInfo');
    }
  }, [token, userInfo]);

  const navigate = useNavigate();

  const handleLogin = (newToken, info) => {
    setToken(newToken);
    setUserInfo(info);
    console.log(userInfo);
    localStorage.setItem('token', newToken);
    localStorage.setItem('userInfo', JSON.stringify(info));
    

  };

  const handleLogout = () => {
    setToken(null);
    setUserInfo(null);
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
    navigate('/');
  };

  const routes = useRoutes([
    {
      path: '/',
      element: <Login onLogin={handleLogin} />,
    },
    {
      path: '/signup',
      element: <Signup onLogin={handleLogin} />,
    },
    {
      path: '/dashboard',
      element: isAuthenticated ? <Dashboard onLogout={handleLogout} token={token} user={userInfo}/> : <Navigate to="/" replace />,
    },
    {
      path: '/addbooks',
      element: isAuthenticated ? <AddBooks onLogout={handleLogout} token={token} user={userInfo}/> : <Navigate to="/" replace />,
    },
    {
      path: '/issuebooks',
      element: isAuthenticated ? <IssueBooks onLogout={handleLogout} token={token} user={userInfo}/> : <Navigate to="/" replace />,
    },
    {
      path: '/reissuebooks',
      element: isAuthenticated ? <ReissueBooks onLogout={handleLogout} token={token} user={userInfo}/> : <Navigate to="/" replace />,
    },
    {
      path: '/report',
      element: isAuthenticated ? <Report onLogout={handleLogout} token={token} user={userInfo}/> : <Navigate to="/" replace />,
    },
  ]);

  return routes;
}

export default App;

import { useState, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';

const initialUserData = {id:'', name:'', lang:'', profileImg:'', type:''};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [userData, setUserData] = useState(initialUserData);
  const [customerData,  setCustomerData] = useState([]);
  
  const logIn = (userData, customerData)=>{
    setIsLoggedIn(true);
    setUserData(userData);
    setCustomerData(customerData);
    console.log(isLoggedIn);
  }
  
  const logOut = ()=>{
    setIsLoggedIn(false);
    setUserData(initialUserData);
    setCustomerData(null);
    console.log(isLoggedIn);
  }

  useEffect(()=>{
  }, [isLoggedIn]);

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Protected isLoggedIn={isLoggedIn}><Home logOut={logOut} userData={userData} customerData={customerData}/></Protected>} />
        <Route path='/login' element={<Login logIn={logIn}/>} />
      </Routes>
    </div>
  );
}

export default App;

const Protected = ({isLoggedIn, children})=>{
  if(!isLoggedIn){
    return Navigate( {to:'/login'});
  }

  return children;
}
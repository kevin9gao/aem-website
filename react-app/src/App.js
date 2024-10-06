import logo from './images/favicon.png';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  BrowserRouter,
  Route,
  Routes
} from 'react-router-dom';
import * as sessionActions from './store/session';
import './App.css';
import Navbar from './components/Navbar';
import Login from './components/Auth/login';
import Signup from './components/Auth/signup';
import HomePage from './components/Homepage';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // console.log('App.js restoreUser dispatched');
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);


  return (
    <BrowserRouter>
      <main>
        <div className='app navbar container'>
          <Navbar isLoaded={isLoaded} />
        </div>
        <div className='app body container'>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/about' />
            <Route path='/shop' />
            <Route path='/contact' />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
          </Routes>
        </div>
      </main>
    </BrowserRouter>
  );
}

export default App;

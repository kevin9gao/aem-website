import logo from './favicon.png';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, 
        Route, 
        Routes } from 'react-router-dom';
import * as sessionActions from './store/session';
import Navbar from './components/Navbar';
import './App.css';

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
            <Route path='/'>
              Homepage
            </Route>
            <Route path='/about'>
              About Us
            </Route>
            <Route path='/shop'>
              Shop
            </Route>
            <Route path='/contact'>
              Contact Us
            </Route>
          </Routes>
        </div>
      </main>
    </BrowserRouter>
  );
}

export default App;

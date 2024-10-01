import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, 
        Route, 
        Routes } from 'react-router-dom';
import './App.css';

function App() {
  const dispatch = useDispatch();
  
  return (
    <BrowserRouter>
      <div className='main container'>
        <div className='navbar container'>
          Navbar Placeholder
        </div>
        <div className='body container'>
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
      </div>
    </BrowserRouter>
  );
}

export default App;

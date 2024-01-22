import React, {Component} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import GalleryList from './pages/GalleryList';
import Intro from './pages/Intro';
import Home from './pages/Home';

import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/list' element={<GalleryList/>}></Route>
        <Route path='/intro' element={<Intro/>}></Route>
        <Route path='/home' element={<Home/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

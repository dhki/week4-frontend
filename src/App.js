import React, {Component} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import GalleryList from './pages/GalleryList';

import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/list' element={<GalleryList/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

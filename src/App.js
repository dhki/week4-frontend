import React, { lazy, Suspense, useEffect } from 'react';
import { useLocation, Routes, Route } from 'react-router-dom';
import GalleryList from './pages/GalleryList';
import Intro from './pages/Intro';
import Home from './pages/Home';
import SpinLoader from './components/Layouts/SpinLoader';

import './App.css';

function App() {
  return (
    <div className="App">
      <Suspense fallback={<SpinLoader />} >
        <Routes>
          <Route path='/list' element={<GalleryList />}></Route>
          <Route path='/intro' element={<Intro />}></Route>
          <Route path='/home' element={<Home />}></Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;

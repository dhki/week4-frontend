import React, { lazy, Suspense, useEffect } from 'react';
import { useLocation, Routes, Route } from 'react-router-dom';
import GalleryList from './pages/GalleryList';
import Intro from './pages/Intro';
import Home from './pages/Home';
import KakaoLogin from './pages/login';
import SpinLoader from './components/Layouts/SpinLoader';
import Profile from './components/User/Profile';
import Gallery from './pages/Gallery';

import './App.css';

function App() {
  return (
    <div className="App">
      <Suspense fallback={<SpinLoader />} >
        <Routes>
          <Route path='/list' element={<GalleryList />}></Route>
          <Route path='/login' element={<KakaoLogin />}></Route>
          <Route path='/intro' element={<Intro />}></Route>
          <Route path='/home' element={<Home />}></Route>
          <Route path="/profile/:username" element={
            <Profile />
          } />
          <Route path='/:id' element={
            <Gallery />
          } />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;

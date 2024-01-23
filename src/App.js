import React, { lazy, Suspense, useEffect } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import { Cookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { loginInitial } from './actions/userAction';
import GalleryList from './pages/GalleryList';
import Intro from './pages/Intro';
import Home from './pages/Home';
import KakaoLogin from './pages/login';
import SpinLoader from './components/Layouts/SpinLoader';
import Profile from './components/User/Profile';
import Gallery from './pages/Gallery';
import UpdateProfile from './components/User/Update/UpdateProfile';
import Update from './components/User/Update/Update';

import './App.css';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // 쿠키에서 인증 토큰 읽기
    const cookies = new Cookies();
    const token = cookies.get('token');
    if (token) {
      // 인증 토큰이 존재하면 로그인 상태 복원
      dispatch(loginInitial(token));
      // 필요하다면 서버에 토큰 유효성 확인 요청
    }
  }, [dispatch]);

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
          <Route path="/accounts/edit" element={
            <Update activeTab={0}>
              <UpdateProfile />
            </Update>
          } />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;

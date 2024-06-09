import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import Login from './components/Login';
import Registration from './components/Registration';
import Post from './components/Post';

const Main = () => (
  <BrowserRouter basename={import.meta.env.DEV ? "/" : "/SakuruSite/"}>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/post" element={<Post />} />
      <Route path="/*" element={<App />} />
    </Routes>
  </BrowserRouter>
);

export default Main;

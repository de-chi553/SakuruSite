import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import Login from './components/Login';
import Registration from './components/Registration';
import Post from './components/Post';

const Main = () => (
  <Router>
    <Routes>
      <Route path="SakuruSite/login" element={<Login />} />
      <Route path="SakuruSite/registration" element={<Registration />} />
      <Route path="SakuruSite/post" element={<Post />} />
      <Route path="SakuruSite/*" element={<App />} />
    </Routes>
  </Router>
);

export default Main;

import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css'; // Import the CSS file as needed
import CustomNavigationBar from './components/CustomNavigationBar';
import All from './components/All';
import Sports from './components/Sports';
import Culture from './components/Culture';
import Research from './components/Research';
import '@fortawesome/fontawesome-free/css/all.min.css';

const App = () => {
  const [activeButton, setActiveButton] = useState('All');
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [selectedUniversity, setSelectedUniversity] = useState('');

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const selectUniversity = (university) => {
    setSelectedUniversity(university);
    setIsMenuVisible(false);
  };

  console.log("selectedUniversity の値:", selectedUniversity);

  return (
    <div className="container">
      <header className="header">
        <h1 className="title">
          歩くアルパカ {selectedUniversity ? `${selectedUniversity}サークル紹介` : '大学サークル紹介'}
        </h1>
        <button onClick={toggleMenu} className="menuButton">
          <i className="fas fa-bars"></i>
        </button>
      </header>
      {isMenuVisible && (
        <div className="menu">
          <Link to="/login" className="menuItem">投稿</Link>
          <button onClick={() => setSelectedUniversity('')} className="menuItem">切り替え</button>
          {selectedUniversity === '' && (
            <div className="universityMenu">
              <button onClick={() => selectUniversity('立命館大学')} className="universityMenuItem">立命館大学</button>
              <button onClick={() => selectUniversity('同志社大学')} className="universityMenuItem">同志社大学</button>
              <button onClick={() => selectUniversity('関西大学')} className="universityMenuItem">関西大学</button>
              <button onClick={() => selectUniversity('関西学院大学')} className="universityMenuItem">関西学院大学</button>
            </div>
          )}
        </div>
      )}
      <CustomNavigationBar activeButton={activeButton} setActiveButton={setActiveButton} />
      <div className="contentContainer">
        <Routes>
          <Route path="SakuruSite/all" element={<All selectedUniversity={selectedUniversity} />} />
          <Route path="SakuruSite/sports" element={<Sports selectedUniversity={selectedUniversity} />} />
          <Route path="SakuruSite/culture" element={<Culture selectedUniversity={selectedUniversity} />} />
          <Route path="SakuruSite/research" element={<Research selectedUniversity={selectedUniversity} />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;

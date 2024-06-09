import React from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigateを追加
import './styles.css';

const CustomNavigationBar = ({ activeButton }) => {
  const navigate = useNavigate(); // useNavigateフックを使用

  const handlePress = (buttonName) => {
    // ボタンがクリックされたときに、対応するパスに遷移する
    switch (buttonName) {
      case 'All':
        navigate('/all');
        break;
      case 'Sports':
        navigate('/sports');
        break;
      case 'Culture':
        navigate('/culture');
        break;
      case 'Research':
        navigate('/research');
        break;
      default:
        navigate('/all'); // デフォルトは'all'に遷移する
        break;
    }
  };

  return (
    <div className="navContainer">
      <div className="buttonsContainer">
        <button onClick={() => handlePress('All')} className={`button ${activeButton === 'All' ? 'activeButton' : ''}`}>
          ALL
        </button>
        <button onClick={() => handlePress('Sports')} className={`button ${activeButton === 'Sports' ? 'activeButton' : ''}`}>
          体育会系
        </button>
        <button onClick={() => handlePress('Culture')} className={`button ${activeButton === 'Culture' ? 'activeButton' : ''}`}>
          文化系
        </button>
        <button onClick={() => handlePress('Research')} className={`button ${activeButton === 'Research' ? 'activeButton' : ''}`}>
          研究系
        </button>
      </div>
    </div>
  );
};

export default CustomNavigationBar;

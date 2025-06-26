import { useState } from 'react';
import { Link } from 'react-router-dom';

const Bottombar = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      <div className={`bottombar ${isVisible ? '' : 'hidden'}`}>
        <div>
          <h2>Мы в соц. сетях</h2>
          <a href="https://t.me/TechnicalsupportLipetskART_bot" target='_blank' rel="noopener noreferrer">Телеграм</a>
          <h2>Тех. поддержка</h2>
          <a href="https://t.me/TechnicalsupportLipetskART_bot" target='_blank' rel="noopener noreferrer">Нажмите сюда</a>
        </div>
        <div>
          <h2>Дополнительно</h2>
          <Link to="/about">О нас</Link>
        </div>
        <div>
          <h2>Горячая линия</h2>
          <p>+7 920 545 08 62</p>
          <p>+7 915 853 76 54</p>
        </div>
      </div>

      <button
        className={`toggle-button ${isVisible ? '' : 'bottom'}`}
        onClick={toggleVisibility}
      >
        {isVisible ? 'Скрыть' : 'Показать'}
      </button>
    </>
  );
};

export default Bottombar;
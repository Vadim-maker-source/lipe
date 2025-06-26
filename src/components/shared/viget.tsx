import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Viget: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleButtons = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="wave-button-container">
      <div className="wave-button" onClick={toggleButtons}>
        <img src="/assets/textBtn.png" alt="" height={30} width={30} />
      </div>
      <div className={`additional-button button-1 ${isExpanded ? 'expanded' : ''}`}><Link to="/support"><img src="/assets/textBtn.png" alt="" height={30} width={30} /></Link></div>
      <div className={`additional-button button-2 ${isExpanded ? 'expanded' : ''}`}>
        <a href="https://t.me/TechnicalsupportLipetskART_bot" target="_blank" rel="noopener noreferrer">
          <img src="/assets/telegram.png" alt="telegram" className="telegram" />
        </a></div>
      <div className="wave wave-1"></div>
      <div className="wave wave-2"></div>
      <div className="wave wave-3"></div>
    </div>
  );
};

export default Viget;
import React from 'react';
import attractions from '../../components/shared/attractionsData';
import { useNavigate } from 'react-router-dom';

const Leb: React.FC = () => {
  const monuments = attractions.filter(attraction => attraction.category === "lebedyan");

  const navigate = useNavigate();

  const handleAttractionClick = (id: number) => {
    navigate(`/attraction/${id}`);
  };

  return (
    <div>
      <img src="/assets/lebb.png" alt="" />
      <ul>
        {monuments.map((attraction) => (
          <li key={attraction.id}>
            <img src={attraction.image} alt="" />
            <div className="description">
              <h2>{attraction.name}</h2>
              <p><strong>Описание:</strong> {attraction.description}  <a key={attraction.id} onClick={() => handleAttractionClick(attraction.id)} style={{ textDecoration: 'underline', cursor: 'pointer' }}>Подробнее</a></p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leb;
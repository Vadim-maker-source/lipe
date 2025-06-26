import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import attractions from '../../components/shared/attractionsData';
import { addOtziv, getOtziviByAttractionId } from '../../lib/appwrite/api';
import { account, appwriteConfig, storage } from '../../lib/appwrite/config';
import styled from 'styled-components';
import type { Otziv } from '../../lib/appwrite/types';

interface User {
  $id: string;
  name: string;
  email: string;
}

const AttractionDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const attraction = attractions.find((attraction) => attraction.id === Number(id));
  const [user, setUser] = useState<User | null>(null);
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);
  const [showMap, setShowMap] = useState(true);

  const navigate = useNavigate();

  const [otzivi, setOtzivi] = useState<Otziv[]>([]);
  const [newOtziv, setNewOtziv] = useState<Otziv & { imageFile?: File }>({
    attractionId: id || '',
    userId: user?.$id,
    username: '',
    text: '',
    rating: 5,
    imageFile: undefined,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await account.get();
        setUser(user as User);
      } catch (error) {
        setUser(null);
      }
    };

    fetchUser();
  }, [navigate]);

  useEffect(() => {
    if (id) {
      loadOtzivi(id);
    }
  }, [id]);

  const loadOtzivi = async (attractionId: string) => {
    try {
      const otziviData = await getOtziviByAttractionId(attractionId);

      const transformedOtzivi = otziviData.map((doc) => ({
        id: doc.$id,
        attractionId: doc.attractionId,
        username: doc.username,
        userId: doc.userId,
        text: doc.text,
        rating: doc.rating,
        imageUrl: doc.imageUrl,
        createdAt: doc.createdAt,
      }));

      setOtzivi(transformedOtzivi);
    } catch (error) {
      console.error('Ошибка при загрузке отзывов:', error);
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewOtziv({ ...newOtziv, text: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOtziv.text.trim()) {
      alert('Введите текст отзыва');
      return;
    }

    if (!user) {
      alert('Пользователь не авторизован');
      return;
    }

    try {
      let imageUrl = '';
      if (newOtziv.imageFile) {
        const file = await storage.createFile(
          appwriteConfig.storageId,
          'unique()', 
          newOtziv.imageFile
        );
        imageUrl = `https://cloud.appwrite.io/v1/storage/buckets/67d855c50035f5157685/files/${file.$id}/view?project=67d6b2d0000e2a3e019e`;
      }

      await addOtziv({
        ...newOtziv,
        username: user.name,
        imageUrl,
      });

      alert('Отзыв успешно добавлен!');
      setNewOtziv({ ...newOtziv, text: '', imageFile: undefined });
      setIsModalOpen(false);
      if (id) {
        loadOtzivi(id);
      }
    } catch (error) {
      console.error('Ошибка при добавлении отзыва:', error);
      alert('Не удалось добавить отзыв');
    }
  };

  const renderStars = (rating: number) => {
    return '⭐'.repeat(Math.round(rating));
  };

  const calculateAverageRating = (otzivi: Otziv[]) => {
    if (otzivi.length === 0) return 0;

    const totalRating = otzivi.reduce((sum, otziv) => sum + otziv.rating, 0);
    const averageRating = totalRating / otzivi.length;
    return Math.round(averageRating * 10) / 10;
  };

  const averageRating = calculateAverageRating(otzivi);

  if (!attraction) {
    return <div>Достопримечательность не найдена</div>;
  }

  if(attraction.place?.length === 0){
    attraction.place = "Информация отсутствует."
  }

  if(attraction.openingDate?.length === 0){
    attraction.openingDate = "Информация отсутствует."
  }

  let rayon: string;

  if (
    attraction.category === "parks" ||
    attraction.category === "churches" ||
    attraction.category === "museums"
  ) {
    rayon = "Липецк";
  } else if (attraction.category === "zapovedniki") {
    rayon = "Липецкая область";
  } else if (attraction.category === "monuments") {
    rayon = `${attraction.place}`;
  } else if (attraction.category === "dankov") {
    rayon = "Данковский район, Липецкая область";
  } else if (attraction.category === "lev-tolstoy") {
    rayon = "Лев-Толстовский район, Липецкая область";
  } else if (attraction.category === "chapligin") {
    rayon = "Чаплыгинский район, Липецкая область";
  } else if (attraction.category === "lebedyan") {
    rayon = "Лебедянский район, Липецкая область";
  } else if (attraction.category === "krasnoe") {
    rayon = "Краснинский район, Липецкая область";
  } else if (attraction.category === "stanovoe") {
    rayon = "Становлянский район, Липецкая область";
  } else if (attraction.category === "elec") {
    rayon = "Елецкий район, Липецкая область";
  } else if (attraction.category === "zadonsk") {
    rayon = "Задонский район, Липецкая область";
  } else if (attraction.category === "gryazi") {
    rayon = "Грязинский район, Липецкая область";
  } else if (attraction.category === "dobrinka") {
    rayon = "Добринский район, Липецкая область";
  } else if (attraction.category === "usman") {
    rayon = "Усманский район, Липецкая область";
  } else if (attraction.category === "dobroe") {
    rayon = "Добровский район, Липецкая область";
  } else if (attraction.category === "izmalkovo") {
    rayon = "Измалковский район, Липецкая область";
  } else if (attraction.category === "volovo") {
    rayon = "Воловский район, Липецкая область";
  } else if (attraction.category === "hlevnoe") {
    rayon = "Хлевенский район, Липецкая область";
  } else if (attraction.category === "terbuni") {
    rayon = "Тербунский район, Липецкая область";
  } else if (attraction.category === "dolgorukovo") {
    rayon = "Долгоруковский район, Липецкая область";
  } else {
    rayon = "Неизвестный район";
  }
  

  useEffect(() => {
    if (!showMap || !attraction) return;
  
    const scriptId = 'yandex-maps-api';
  
    function initMap() {
      if (!attraction) return;
      const query = `${attraction.name}, ${rayon}`;
  
      // @ts-ignore
      ymaps.geocode(query).then((res) => {
        const firstGeoObject = res.geoObjects.get(0);
  
        if (!firstGeoObject) {
          console.warn('Объект не найден на карте');
          return;
        }
  
        const coords = firstGeoObject.geometry.getCoordinates();
  
        // Очищаем контейнер перед созданием новой карты
        const mapContainer = document.getElementById('yandex-map');
        if (mapContainer) {
          mapContainer.innerHTML = '';
        }
  
        // @ts-ignore
        const map = new ymaps.Map('yandex-map', {
          center: coords,
          zoom: 15,
        });
  
        // @ts-ignore
        const placemark = new ymaps.Placemark(coords, {
          balloonContent: firstGeoObject.getAddressLine(),
          hintContent: attraction.name,
        }, {
          preset: 'islands#redIcon',
        });
  
        map.geoObjects.add(placemark);
      });
    }
  
    const loadYandexMap = () => {
      if (!document.getElementById(scriptId)) {
        const script = document.createElement('script');
        script.id = scriptId;
        script.src = `https://api-maps.yandex.ru/2.1/?apikey=${import.meta.env.VITE_APPWRITE_YANDEX_MAP_API}&lang=ru_RU`;
        script.async = true;
        document.body.appendChild(script);
  
        script.onload = () => {
          // @ts-ignore
          ymaps.ready(initMap);
        };
      } else {
        // @ts-ignore
        if (typeof ymaps !== 'undefined') {
          // @ts-ignore
          ymaps.ready(initMap);
        }
      }
    };
  
    loadYandexMap();
  }, [attraction, showMap]);

  return (
    <div className="attraction-details">
      <div className="d">
        <img src={attraction.image} alt={attraction.name} />
        <div className="description">
          <h2>{attraction.name}</h2>
          <p><strong>Описание:</strong> {attraction.description}</p>
          <br />
          <p><strong>Общий рейтинг:</strong> {renderStars(averageRating)} ({averageRating}/5) <span
            style={{
              marginLeft: '1rem',
              padding: '0.3rem 0.8rem',
              fontSize: '24px',
              color: '#eee',
              cursor: 'pointer',
            }}
            onClick={() => setShowMap(prev => !prev)}
          >
            {showMap ? 'Скрыть карту' : 'Показать карту'}
          </span></p>
          
          <br />
        </div>
      </div>

      {showMap ? (
      <>
        <h1 style={{ color: '#f73333', textAlign: 'center' }}>
          Карта может дать погрешное местоположение. Всегда проверяйте информацию!
        </h1>
        <div id="yandex-map" style={{ width: '100%', height: '700px', marginTop: '2rem' }}></div>
      </>
    ) : (
      <div></div>
    )}
      <br />
      <div className="description">
        <p><strong>Дата открытия:</strong> {attraction.openingDate}</p>
        <p><strong>Адрес:</strong> {attraction.place}</p>
      </div>

      {isModalOpen && (
  <div className="modal-overlay">
    <div className="modal">
      <h3>Добавить отзыв</h3>
      <br />
      <form onSubmit={handleSubmit}>
        <textarea
          value={newOtziv.text}
          onChange={handleTextChange}
          placeholder="Ваш отзыв"
          rows={4}
          required
        />
        <br />
        <div>
          <label>
            Оценка:
            <StyledWrapper>
              <div className="rating">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <React.Fragment key={rating}>
                    <input
                      type="radio"
                      id={`star${rating}`}
                      name="rate"
                      value={rating}
                      checked={newOtziv.rating === rating}
                      onChange={() => setNewOtziv({ ...newOtziv, rating })}
                    />
                    <label htmlFor={`star${rating}`} title={`${rating} звезд`} />
                  </React.Fragment>
                ))}
              </div>
            </StyledWrapper>
          </label>
        </div>
        <br />
        <StyledWrap>
          <label>Картинка (необязательно)</label>
          <label className="custum-file-upload" htmlFor="file">
            {previewImageUrl ? (
              <img
                src={previewImageUrl}
                alt="Превью"
                style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: '10px' }}
              />
            ) : (
              <>
                <div className="icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <g strokeWidth={0} id="SVGRepo_bgCarrier" />
  <g strokeLinejoin="round" strokeLinecap="round" id="SVGRepo_tracerCarrier" />
  <g id="SVGRepo_iconCarrier">
    <path
      fill="currentColor"
      d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z"
      clipRule="evenodd"
      fillRule="evenodd"
    />
  </g>
</svg>
                </div>
                <div className="text">
                  <span>Нажми, чтобы загрузить фотографию</span>
                </div>
              </>
            )}
            <input
              type="file"
              id="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  const file = e.target.files[0];
                  setNewOtziv({ ...newOtziv, imageFile: file });
                  setPreviewImageUrl(URL.createObjectURL(file));
                }
              }}
            />
          </label>
        </StyledWrap>
        <br />
        <div className="btm-btns-modal">
          <button type="submit" className="send-button">Отправить</button>
          <button
            type="button"
            onClick={() => {
              setIsModalOpen(false);
              setPreviewImageUrl(null);
            }}
            className="close-button"
          >
            Закрыть
          </button>
        </div>
      </form>
    </div>
  </div>
)}
      <div className="details-bottom">
      <div className="otzivi-list">
        {otzivi.length > 0 ? (
          otzivi.map((otziv) => (
            <div key={otziv.id} className="otziv-item">
              <span><h2>Автор:</h2> <p>{otziv.username}</p></span>
              <span><h2>Оценка:</h2> <p>{renderStars(otziv.rating)}</p></span>
              <span><h2>Отзыв:</h2> <p>{otziv.text}</p></span>
              {otziv.imageUrl && (
                <div>
                  <img src={otziv.imageUrl} alt="Отзыв" style={{ width: '50%', height: '40%', borderRadius: '30px' }} />
                </div>
              )}
              <span><small>{new Date(otziv.createdAt || '').toLocaleString()}</small></span>
            </div>
          ))
        ) : (
          <p style={{ color: '#fff' }}>Отзывов пока нет.</p>
        )}
        <div className="botton-subs">
        <div className="separator"></div>
          <button
            onClick={() => {
              if (!user) {
                if(confirm('Пожалуйста, войдите в систему, чтобы оставить отзыв')){
                navigate('/sign-in');
                }
              } else {
                setIsModalOpen(true);
              }
            }}
            className="add-comment-button"
          >
            Добавить отзыв
          </button>
        </div>
      </div>
      
      </div>
      <br />
    </div>
  );
};

const StyledWrapper = styled.div`
  .rating:not(:checked) > input {
    position: absolute;
    appearance: none;
  }

  .rating:not(:checked) > label {
    float: right;
    cursor: pointer;
    font-size: 30px;
    color: #666;
  }

  .rating:not(:checked) > label:before {
    content: '★';
  }

  .rating > input:checked + label:hover,
  .rating > input:checked + label:hover ~ label,
  .rating > input:checked ~ label:hover,
  .rating > input:checked ~ label:hover ~ label,
  .rating > label:hover ~ input:checked ~ label {
    color: #e58e09;
  }

  .rating:not(:checked) > label:hover,
  .rating:not(:checked) > label:hover ~ label {
    color: #ff9e0b;
  }

  .rating > input:checked ~ label {
    color: #ffa723;
  }`;

  const StyledWrap = styled.div`
  .custum-file-upload {
    height: 220px;
    width: 345px;
    display: flex;
    flex-direction: column;
    align-items: space-between;
    gap: 20px;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    border: 2px dashed #cacaca;
    background-color: rgba(255, 255, 255, 1);
    padding: 1rem;
    border-radius: 10px;
    box-shadow: 0px 48px 35px -48px rgba(0,0,0,0.1);
  }

  .custum-file-upload .icon {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .custum-file-upload .icon svg {
    height: 80px;
    fill: rgba(75, 85, 99, 1);
  }

  .custum-file-upload .text {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .custum-file-upload .text span {
    font-weight: 400;
    color: rgba(75, 85, 99, 1);
  }

  .custum-file-upload input {
    display: none;
  }`;

export default AttractionDetailsPage;
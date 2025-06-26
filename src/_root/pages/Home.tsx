import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Home = () => {
  const images = [
    {
      id: 1,
      link: 'https://будьвдвижении.рф/',
      image: '/assets/rec10.png'
    },
    {
      id: 2,
      link: 'https://sport-music.ru/',
      image: '/assets/rec20.png'
    },
    {
      id: 3,
      link: 'https://edu.sirius.online/#/',
      image: '/assets/rec30.png'
    },
    {
      id: 4,
      link: 'https://www.kvantorium48.ru/node/1648',
      image: '/assets/rec40.png'
    },
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Функция для перелистывания вперед
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Функция для перелистывания назад
  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // Автоматическая смена изображений каждые 5 секунд
  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 7000);

    return () => clearInterval(interval);
  }, [currentImageIndex]);

  return (
    <div className="main-container">
      <img src="/assets/mainImg.png" alt="background" />
      <div className="list">
        <div className="list-group">
          <Link to="/monuments">
            <button className="monuments">Памятники&nbsp; &#8594;</button>
          </Link>
          <Link to="/churches">
            <button className="churches">Храмы&nbsp; &#8594;</button>
          </Link>
          <Link to="/museums">
            <button className="museum">Музеи&nbsp; &#8594;</button>
          </Link>
        </div>
        <div className="list-group">
          <Link to="/parks">
            <button className="parks">Парки&nbsp; &#8594;</button>
          </Link>
          <Link to="/zapovedniki">
            <button className="zapovedniki">Заповедники&nbsp; &#8594;</button>
          </Link>
        </div>
      </div>
      <br /><br /><br /><br /><br />
      <div className="map">
        <div className="full-map">
          <img src="/assets/map.png" alt="" width={600} height={600} />
          <div className="town-list">
            <Link to="/dankov" className="town-name dankov">
              <div className="point"></div> <p>Данков</p>
            </Link>
            <Link to="/lev-tolstoy" className="town-name lev">
              <div className="point"></div> <p>Лев<br />Толстой</p>
            </Link>
            <Link to="/chapligin" className="town-name chap">
              <div className="point"></div> <p>Чаплыгин</p>
            </Link>
            <Link to="/stanovoe" className="town-name stan">
              <div className="point"></div> <p>Становое</p>
            </Link>
            <Link to="/krasnoe" className="town-name krasnoe">
              <div className="point"></div> <p>Красное</p>
            </Link>
            <Link to="/lebedyan" className="town-name leb">
              <div className="point"></div> <p>Лебедянь</p>
            </Link>
            <Link to="/dobroe" className="town-name dob">
              <div className="point"></div> <p>Доброе</p>
            </Link>
            <Link to="/izmalkovo" className="town-name izm">
              <div className="point"></div> <p>Измалково</p>
            </Link>
            <Link to="/elec" className="town-name elec">
              <div className="point"></div> <p>Елец</p>
            </Link>
            <Link to="/dolgorukovo" className="town-name dolg">
              <div className="point"></div> <p>Долгоруково</p>
            </Link>
            <Link to="/zadonsk" className="town-name zad">
              <div className="point"></div> <p>Задонск</p>
            </Link>
            <Link to="/volovo" className="town-name vol">
              <div className="point"></div> <p>Волово</p>
            </Link>
            <Link to="/terbuni" className="town-name ter">
              <div className="point"></div> <p>Тербуны</p>
            </Link>
            <Link to="/hlevnoe" className="town-name hlev">
              <div className="point"></div> <p>Хлевное</p>
            </Link>
            <Link to="/usman" className="town-name usm">
              <div className="point"></div> <p>Усмань</p>
            </Link>
            <Link to="/gryazi" className="town-name gryazi">
              <div className="point"></div> <p>Грязи</p>
            </Link>
            <Link to="/dobrinka" className="town-name dobrinka">
              <div className="point"></div> <p>Добринка</p>
            </Link>
            <Link to="/" className="town-name lipetsk">
              <p>Липецк</p>
            </Link>
          </div>
        </div>
          <p className="about-lip">
            Липецк находится примерно в 370 км на юг от Москвы, на пути к черноморским курортам, в живописной русской провинции.
            Его протяженность составляет 200 км с севера на юг и 150 км с запада на восток.
            Липецкая область — регион с богатой историей и культурой, отражающей многие черты центральной России.
            Город Липецк — административный и культурный центр области.
            <br />
            <span style={{ fontWeight: 'bolder', color: 'orange' }}>&larr; Кликните на название любой области кроме Липецка</span>
          </p>
      </div>
      <br />
      <br />
      <div className="recommend">
        <h2 className="rec">Рекомендуем</h2>
        <div className="image-slider">
          <button className="scroll-arrow left" onClick={prevImage}>
            &#8592;
          </button>
          <Link to={images[currentImageIndex].link} target="_blank">
            <img
              src={images[currentImageIndex].image}
              alt={`Recommendation ${currentImageIndex + 1}`}
              className="slider-image"
            />
          </Link>
          <button className="scroll-arrow right" onClick={nextImage}>
            &#8594;
          </button>
        </div>
      </div>
      <div className="push-card-container">
        <a href="https://culture.gosuslugi.ru/" target="_blank"><button>Оформить</button></a>
        <span>Оформить пушкинскую карту</span>
        <img src="/assets/pushk-card2.png" alt="" />
      </div>
    </div>
  );
};

export default Home;
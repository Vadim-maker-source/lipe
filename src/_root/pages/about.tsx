import { Link } from "react-router-dom"

const About = () => {
  return (
    <div className="main-container">
      <img src="/assets/aboutImg.png" alt="background" />
      <Link to="/"><button className="return-button">Вернуться на главную</button></Link>

      <div className="g1 abb">
        <div className="ab-text">
          <h2>Наша команда</h2>
          <br />
          <p>Овсников Кирилл: руководитель проекта, <br />
Моисеенкова Таисия: веб-дизайнеры, <br />
Буреев Вадим: программист.</p>
        </div>
        <img src="/assets/1ab.png" alt="" />
      </div>
      <div className="g2 abb">
        <img src="/assets/2ab.png" alt="" />
        <div className="ab-text">

          <h2>История сайта</h2>

          <p>Первоначально сайт задумывался как ресурс, посвященный исключительно культуре Липецка, но в итоге охватывает всю Липецкую область.</p>
          </div>
      </div>
      <div className="g1 abb">
      <div className="ab-text">
          
          <h2>Цель проекта</h2>

          <p>Создать сайт, способствующий  поддержке социальных инициатив молодежи в сфере культуры, искусства и общественной деятельности.</p>

          </div>
        <img src="/assets/3ab.png" alt="" />
      </div>
      <div className="g2 abb">
        <img src="/assets/4ab.png" alt="" />
        <div className="ab-text">
          <h2>О Липецкой области</h2>
          <p>Липецкая область — регион с богатой историей и культурой, отражающей многие черты центральной России.
 
 Город Липецк —  административный и культурный центр области.</p>
          </div>
      </div>
      <div className="g1 abb g1-last">
      <div className="ab-text">
          <h2>Что позволяет данный сайт</h2>
          <p>Сайт позволяет поддержать социальные инициативы молодежи в области культуры, творчества, искусства и общественной деятельности.</p>
          </div>
        <img src="/assets/5ab.png" alt="" />
      </div>
      <div className="actual-info">
        <h2>Актуальная информация о нашем сайте</h2>
        <div className="act-img">
          <img src="/assets/act1.png" className="act1" alt="" />
          <a href="https://t.me/TechnicalsupportLipetskART_bot" target="_blank"><img src="/assets/act2.png" className="act2" alt="" /></a>
          <img src="/assets/act3.png" className="act3" alt="" />
        </div>
      </div>
    </div>
  )
}

export default About
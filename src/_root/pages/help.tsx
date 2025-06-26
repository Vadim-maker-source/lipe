import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { account } from '../../lib/appwrite/config';

interface User {
  $id: string;
  name: string;
  email: string;
}

const Help = () => {
  const form = useRef<HTMLFormElement>(null);
  const [notification, setNotification] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(0);

  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // useEffect(() => {
  //   const storedTime = localStorage.getItem('lastSentTime');
  //   if (storedTime) {
  //     const currentTime = Date.now();
  //     const timeDiff = currentTime - parseInt(storedTime, 10);
  //     const twentyFourHours = 24 * 60 * 60 * 1000;

  //     if (timeDiff < twentyFourHours) {
  //       setLastSentTime(parseInt(storedTime, 10));
  //       setTimeLeft(twentyFourHours - timeDiff);
  //     } else {
  //       localStorage.removeItem('lastSentTime');
  //     }
  //   }
  // }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await account.get();
        setUser(user as User); // Приводим тип к User
      } catch (error) {
        setUser(null);
        if(confirm('Чтобы отправить письмо в поддержку, нужно войти в аккаунт. Перевести на страницу со входом?')){
          navigate('/sign-in');
        }else{
          navigate('/')
        }
      }
    };

    fetchUser();
  }, [navigate]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1000);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (form.current) {
      const formData = new FormData(form.current);
      const data = {
        name: user?.name || formData.get("user_email"),
        email: user?.email || formData.get("email"),
        message: formData.get("message"),
      };
  
      try {
        const response = await fetch('/api/index/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
  
        if (response.ok) {
          setNotification('Сообщение успешно отправлено!');
          form.current?.reset();
          // const currentTime = Date.now();
          // localStorage.setItem('lastSentTime', currentTime.toString());
          // setLastSentTime(currentTime);
          // setTimeLeft(24 * 60 * 60 * 1000);
        } else {
          const data = await response.json();
          setError(`Ошибка: ${data.error}`);
        }
      } catch (error) {
        console.error(error);
        setNotification('Ошибка при отправке запроса на сервер.');
      }
    }
  };

  // const formatTime = (milliseconds: number) => {
  //   const hours = Math.floor(milliseconds / (1000 * 60 * 60));
  //   const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
  //   const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);

  //   return `${hours} часов ${minutes} минут ${seconds} секунд`;
  // };

  return (
    <div className="container">
      {error && <p>{notification}</p>}
      {/* {lastSentTime ? (
        <div>Вы уже отправили сообщение. Пожалуйста, подождите.</div>
      ) : (
        <div></div>
      )
    } */}
    <br />
      <form ref={form} onSubmit={sendEmail} className="form">
        <label className="label">Имя</label>
        {user ? (
        <textarea name="user_email" required className="textarea" value={user.name} style={{ willChange: 'none', resize: 'none', cursor: "revert" }}></textarea>
        ) : (
          <textarea name="user_email" required className="textarea"></textarea>
        )
        }
        <label className="label">Email</label>
        {user ? (
        <textarea name="email" required className="textarea" value={user.email} style={{ willChange: 'none', resize: 'none', cursor: "revert" }}></textarea>
        ) : (
          <textarea name="user_email" required className="textarea"></textarea>
        )
        }
        <label className="label">Сообщение</label>
        <textarea name="message" required className="textarea" placeholder='Пример: Я забыл свой пароль от аккаунта. Вам ответят в течение дня' />
        <input
          type="submit"
          value="Отправить"
          className='button'
          // disabled={timeLeft > 0}
          // className={timeLeft > 0 ? 'buttonDisabled' : 'button'}
        />
      </form>

      {/* {notification && (
        <div className={timeLeft > 0 ? 'notificationError' : 'notificationSuccess'}>
          {notification}
        </div>
      )} */}

      {/* {timeLeft > 0 && (
        <div className="timer">
          До следующей отправки: {formatTime(timeLeft)}
        </div>
      )} */}
    </div>
  );
};

export default Help;
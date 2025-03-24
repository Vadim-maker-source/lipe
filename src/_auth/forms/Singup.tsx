import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User } from "../../lib/appwrite/types";
import { registerUser } from "../../lib/appwrite/api";
import emailjs from 'emailjs-com';

const Signup: React.FC = () => {
  const form = useRef<HTMLFormElement>(null);
  const [notification, setNotification] = useState<string | null>(null);
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [userCode, setUserCode] = useState<string>("");
  const [isCodeSent, setIsCodeSent] = useState<boolean>(false);
  const [error, setError] = useState("");

  const [user, setUser] = useState<User>({
    name: "",
    email: "",
    password: "",
    age: 0,
  });

  const navigate = useNavigate();

  const generateVerificationCode = (): string => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();

    const code = generateVerificationCode();
    setVerificationCode(code);
    setIsCodeSent(true);

    if (form.current) {
      const codeInput = document.createElement("input");
      codeInput.type = "hidden";
      codeInput.name = "code";
      codeInput.value = code;
      form.current.appendChild(codeInput);

      emailjs
        .sendForm(
          'service_fskg92u',
          'template_8o6bhn7',
          form.current,
          'btSPvhQQNmoRrd_TS'
        )
        .then(
          (result) => {
            console.log(result.text);
            setNotification('Код успешно отправлен на вашу почту!');
            form.current?.reset();
          },
          (error) => {
            console.log(error.text);
            if (error.status === 412) {
              setError("Невозможно отправить код более 3 раз в день.");
            } else {
              setNotification('Ошибка при отправке кода.');
            }
          }
        );
      form.current.removeChild(codeInput);
    }
  };

  // Обработка регистрации
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isCodeSent) {
      setError("Пожалуйста, отправьте код подтверждения.");
      return;
    }
    if (!userCode) {
      setError("Пожалуйста, введите код подтверждения.");
      return;
    }

    if (userCode === verificationCode) {
      try {
        await registerUser(user);
        navigate("/sign-in");
      } catch (error) {
        setError("Ошибка при регистрации");
      }
    } else {
      setError("Неверный код подтверждения");
    }
  };

  return (
    <div className="sign-main">
      <img src="/assets/logo.svg" alt="logo" />
      {error && <p>{error}</p>}
      {notification && <p>{notification}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Имя:</label>
          <input
            type="text"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Почта:</label>
          <input
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Пароль:</label>
          <input
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Возраст:</label>
          <input
            type="number"
            value={user.age}
            onChange={(e) => setUser({ ...user, age: parseInt(e.target.value) })}
            required
          />
        </div>
        <div>
          <label>Код подтверждения:</label>
          <input
            type="text"
            maxLength={6}
            value={userCode}
            onChange={(e) => setUserCode(e.target.value)}
            placeholder="Введите 6-значный код"
            required
          />
        </div>
        <button type="submit">Зарегистрироваться</button>
      </form>

      <form ref={form} onSubmit={sendEmail}>
        <div>
          <label>Email для отправки кода:</label>
          <input
            type="email"
            name="to_email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            required
          />
        </div>
        <div>
          <button type="submit">Отправить код</button>
        </div>
      </form>

      <p>
        Уже есть аккаунт?&nbsp;&nbsp;<Link to="/sign-in">Войдите</Link>
      </p>
    </div>
  );
};

export default Signup;
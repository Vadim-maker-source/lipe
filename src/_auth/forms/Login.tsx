import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../lib/appwrite/api";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await loginUser(email, password);
      navigate("/"); // Перенаправляем на главную страницу
    } catch (error) {
      setError("Неверный email или пароль");
    }
  };

  return (
    <div className="sign-main">
      <img src="/assets/logo.svg" alt="logo" />
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Почта:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Пароль:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Войти</button>
      </form>
      <p>
        Нет аккаунта? <Link to="/sign-up">Зарегистрируйтесь</Link>
      </p>
      <p>
        Войти <Link to="/">без регистрации</Link>
      </p>
    </div>
  );
};

export default Login;
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { account } from "../lib/appwrite/config";

const AuthLayout: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Проверяем, авторизован ли пользователь
    const checkAuth = async () => {
      try {
        await account.get();
        setIsAuthenticated(true); // Пользователь авторизован
        navigate("/"); // Перенаправляем на главную страницу
      } catch (error) {
        setIsAuthenticated(false); // Пользователь не авторизован
      } finally {
        setIsLoading(false); // Завершаем загрузку
      }
    };

    checkAuth();
  }, [navigate]);

  if (isLoading) {
    return <div>Загрузка...</div>; // Показываем загрузку
  }

  // Если пользователь не авторизован, показываем страницы входа/регистрации
  if (!isAuthenticated) {
    return(
      <div className="sign-container">
        <Outlet />
        <img src="/assets/aboutImg.png" alt="" className="sign-img" />
      </div>
    );
  }

  // Если пользователь авторизован, перенаправляем на главную страницу
  return null;
};

export default AuthLayout;
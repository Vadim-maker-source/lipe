import React, { createContext, useContext, useState, ReactNode } from 'react';

// Тип для данных пользователя
interface User {
  id: string;
  username: string;
  email: string;
}

// Тип для контекста
interface UserContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

// Создаём контекст
const UserContext = createContext<UserContextType | undefined>(undefined);

// Провайдер контекста
export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Функция для входа пользователя
  const login = (userData: User) => {
    setUser(userData);
  };

  // Функция для выхода пользователя
  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Хук для использования контекста
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
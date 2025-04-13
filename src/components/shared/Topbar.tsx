import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SearchResults from './SearchResults';
import { account } from '../../lib/appwrite/config';

interface TopbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

interface User {
  $id: string;
  name: string;
  email: string;
}

const Topbar: React.FC<TopbarProps> = ({ searchQuery, setSearchQuery }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

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

  // Выход из аккаунта
  const handleLogout = async () => {
    try {
      await account.deleteSession('current');
      setUser(null);
    } catch (error) {
      console.error('Ошибка при выходе:', error);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setIsModalOpen(!!e.target.value);
  };

  return (
    <>
      <div className="topbar">
        <div className="leftpart">
          <Link to="/">
            <button className="l">
              <img src="/assets/logo.svg" alt="logo" className="logo" />
            </button>
          </Link>
          <Link to="/about">
            <button>
              <p className="topbar-button">О нас</p>
            </button>
          </Link>
          <input
            type="text"
            placeholder="Искать..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-input"
          />
          <img
            src="/assets/search.svg"
            alt="search"
            width={24}
            height={24}
            className="search-img"
          />
          <Link to="/support">
            <button className="sup">
              <p className="topbar-button">Поддержка</p>
            </button>
          </Link>
        </div>
        <div className="rightpart">
          {user ? (
            <>
              <strong style={{ color: '#fff', marginRight: '40px' }}>{user.name}</strong>
              <button onClick={handleLogout}><p className="topbar-button">Выйти</p></button>
            </>
          ) : (
            <>
              <Link to="/sign-in">
                <button><p className="topbar-button">Войти</p></button>
              </Link>
              <Link to="/sign-up">
                <button><p className="topbar-button">Регистрация</p></button>
              </Link>
            </>
          )}
          <a
            href="https://t.me/TechnicalsupportLipetskART_bot"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/assets/telegram.png"
              alt="telegram"
              className="telegram"
            />
          </a>
        </div>
      </div>

      {isModalOpen && (
        <div className="search-modal">
          <div className="search-modal-content">
            <button
              className="close-modal"
              onClick={() => setIsModalOpen(false)}
            >
              &times;
            </button>
            <SearchResults searchQuery={searchQuery} />
          </div>
        </div>
      )}
    </>
  );
};

export default Topbar;
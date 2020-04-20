import './Auth.css';

import React, { useState, useCallback, ChangeEventHandler } from 'react';
import { API } from 'api';
import { Loader } from 'components/Loader/Loader';

interface Auth {
  email: string;
  password: string;
}

export const Auth: React.FC = () => {
  const [formState, setFormState] = useState<Auth>({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleFieldChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      const response = await API.auth(new FormData(e.target as HTMLFormElement));
      if (response.access && response.refresh) {
        localStorage.setItem('ja', response.access);
        localStorage.setItem('jr', response.refresh);
        window.location.reload();
      } else {
        alert('Ошибка при авторизации. Пожалуйста, свяжитесь со службой технической поддержки.');
      }
    } catch (error) {
      if (error.message === '401') {
        alert('Неверный логин/пароль');
      } else {
        console.log(error);
        alert('Ошибка при авторизации. Пожалуйста, свяжитесь со службой технической поддержки.');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <>
      { isLoading && <Loader /> }
      <div className="Auth">
            <label>
              Авторизация пользователя
            </label>
        <form className="Form" onSubmit={handleSubmit}>
          <div className="Form-Field">
            <input 
              type="email" 
              name="email" 
              placeholder="Логин" 
              value={formState.email}
              onChange={handleFieldChange}
            />
          </div>
          <div className="Form-Field">
            <input 
              type="password" 
              name="password" 
              placeholder="Пароль" 
              value={formState.password}
              onChange={handleFieldChange}
            />
          </div>
          <div className="Form-Submit">
            <button className="Btn Btn_add">Войти</button>
          </div>
        </form>
      </div>
    </>
  )
};

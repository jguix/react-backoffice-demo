import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { authCommands } from '../auth.commands';
import './login.component.scss';

export const BOLogin: FC = () => {
  const navigate = useNavigate();

  const login = () => {
    authCommands.login().then(() => navigate('/'));
  };

  return (
    <div className="loginPage">
      <div className="loginContent">
        <div className="boTitle">backoffice</div>

        <div className="loginForm">
          <div data-testid="login-title" className="loginTitle">
            Start Session
          </div>

          <div className="loginLabel">
            <label>Email</label>
          </div>
          <input
            data-testid="login-username-input"
            className="loginField"
            type="text"
            name="username"
          />

          <div className="loginLabel">
            <label>Password</label>
          </div>
          <input
            data-testid="login-password-input"
            className="loginField"
            type="password"
            name="password"
          />

          <button data-testid="login-button" className="loginButton" onClick={login}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { authCommands } from '../auth.commands';
import './login.component.scss';

export const BOLogin: FC = () => {
  const history = useHistory();

  const login = () => {
    authCommands.login().then(() => history.push('/'));
  };

  return (
    <div className="loginPage">
      <div className="loginContent">
        <div className="boTitle">backoffice</div>

        <div className="loginForm">
          <form>
            <div className="loginTitle">Start Session</div>

            <div className="loginLabel">
              <label>Email</label>
            </div>
            <input data-testid="login-username-input" className="loginField" type="text" name="username" />

            <div className="loginLabel">
              <label>Password</label>
            </div>
            <input data-testid="login-password-input" className="loginField" type="password" name="password" />

            <button data-testid="login-button" className="loginButton" onClick={login}>
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

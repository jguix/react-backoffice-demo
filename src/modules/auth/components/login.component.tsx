import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { authCommands } from '../auth.commands';

export const BOLogin: FC = () => {
  const history = useHistory();

  const login = () => {
    authCommands.login().then(() => history.push('/customers'));
  };

  return (
    <>
      <h1>Login</h1>

      <div>
        <label>
          Username:&nbsp;
          <input type="text" name="username" />
        </label>
      </div>
      <div>
        <label>
          Password:&nbsp;
          <input type="password" name="password" />
        </label>
      </div>
      <button onClick={login}>Login</button>
    </>
  );
};

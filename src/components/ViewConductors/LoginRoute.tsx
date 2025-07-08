import React from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import Auth from '../Auth/Auth';

type Props = {
  token: string | null,
  updateUserInfo: () => void
};

export default function LoginRoute(props: Props) {
  const location = useLocation();
  const {
    token, updateUserInfo,
  } = props;

  return (
    <div>
      {
          token
            ? (
              <Redirect to={{
                pathname: '/',
                state: { from: location },
              }}
              />
            )
            : (
              <Auth
                updateUserInfo={updateUserInfo}
              />
            )
        }
    </div>
  );
}

import React from 'react';
import Auth from '../Auth/Auth';
import YourProfile from '../YourProfile/YourProfile';

type Props = {
  token: string | null,
  updateUserInfo: () => void
  userId: string | null,
  logout: Function
};

export default function LoginRoute(props: Props) {
  const {
    logout, userId, token, updateUserInfo,
  } = props;
  return (
    <div>
      {
          token
            ? <YourProfile logout={() => logout} userId={userId} />
            : (
              <Auth
                updateUserInfo={updateUserInfo}
              />
            )
        }
    </div>
  );
}

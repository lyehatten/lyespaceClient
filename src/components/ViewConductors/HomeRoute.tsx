import React from 'react';
import HomePage from '../HomePage/HomePage';
import YourProfile from '../YourProfile/YourProfile';

type Props = {
  token: string | null,
  userId: string | null,
  logout: Function
};

export default function HomeRoute(props: Props) {
  const { token, logout, userId } = props;

  return (
    <div>
      {
          token
            ? <YourProfile logout={logout} userId={userId} />
            : <HomePage />
        }
    </div>
  );
}

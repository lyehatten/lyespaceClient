import React from 'react';
import HomePage from '../HomePage/HomePage';
import YourProfile from '../YourProfile/YourProfile';

type Props = {
  token: string | null,
  userId: string | null,
};

export default function HomeRoute(props: Props) {
  const { token, userId } = props;

  return (
    <div>
      {
          token
            ? <YourProfile userId={userId} />
            : <HomePage />
        }
    </div>
  );
}

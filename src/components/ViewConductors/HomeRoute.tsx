import React from 'react';
import HomePage from '../HomePage/HomePage';
import YourProfile from '../YourProfile/YourProfile';

type Props = {
  token: string | null,
};

export default function HomeRoute(props: Props) {
  const { token } = props;

  return (
    <div>
      {
          token
            ? <YourProfile />
            : <HomePage />
        }
    </div>
  );
}

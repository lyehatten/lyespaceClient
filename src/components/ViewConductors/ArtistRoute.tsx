import React from 'react';
import FetchOther from '../OtherArtist/FetchOther';
import YourProfile from '../YourProfile/YourProfile';
import { UserTypes } from '../../types';

type Props = {
  userId: string | null,
  artistView: string | null,
  logout: Function,
  role: UserTypes | null,
};

export default function ArtistRoute(props: Props) {
  const {
    userId, artistView, logout, role,
  } = props;
  return (
    <div>
      {userId === artistView
        ? <YourProfile logout={logout} userId={userId} />
        : (
          <FetchOther
            userRole={role}
            artistView={artistView}
          />
        )}
    </div>
  );
}

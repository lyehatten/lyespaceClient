import React from 'react';
import FetchOther from '../OtherArtist/FetchOther';
import YourProfile from '../YourProfile/YourProfile';
import { UserTypes } from '../../types';

type Props = {
  artistView: string | null,
  role: UserTypes | null,
};

export default function ArtistRoute(props: Props) {
  const {
    artistView, role,
  } = props;
  return (
    <div>
      {localStorage.getItem('userId') === artistView
        ? <YourProfile />
        : (
          <FetchOther
            userRole={role}
            artistView={artistView}
          />
        )}
    </div>
  );
}

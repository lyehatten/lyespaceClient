import React from 'react';
import FetchOther from '../OtherArtist/FetchOther';
import YourProfile from '../YourProfile/YourProfile';
import { UserTypes } from '../../types';

type Props = {
  userId: string | null,
  artistView: string | null,
  role: UserTypes | null,
};

export default function ArtistRoute(props: Props) {
  const {
    userId, artistView, role,
  } = props;
  return (
    <div>
      {userId === artistView
        ? <YourProfile userId={userId} />
        : (
          <FetchOther
            userRole={role}
            artistView={artistView}
          />
        )}
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ArtistDisplay from './ArtistDisplay';

const styles = {
  root: {
    margin: '25px',
  },
};

interface Props extends WithStyles<typeof styles> {
  updateArtistView: (newArtistView: string) => void
}

type ArtistInfo = {
  firstName: string,
  lastName: string,
  profile: {
    stageName: string | null,
    genres: Array<string> | null,
    instruments: Array<string>
  } | null,
  id: string
};

function ViewArtists(props: Props) {
  const { classes, updateArtistView } = props;

  const [artistInfo, setArtistInfo] = useState<ArtistInfo[]>([]);

  async function fetchArtistInfo() {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/user/findAll`);
      const data = await res.json();
      setArtistInfo(data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchArtistInfo();
    return () => {};
  });
  return (
    <div>
      <Typography className={classes.root} variant="h2">
        All Artist Profiles:
      </Typography>
      <ArtistDisplay
        artistInfo={artistInfo}
        updateArtistView={updateArtistView}
      />
    </div>
  );
}

export default withStyles(styles)(ViewArtists);

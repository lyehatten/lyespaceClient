import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = {
  root: {
    display: 'flex',
    margin: '20px',
  },
  nameBox: {
    margin: '10px',
    display: 'flex',
    width: '40%',
    justifyContent: 'space-between',
  },
  tagBox: {
    margin: '10px',
    width: '30%',
  },
  tags: {
    background: '#73817F',
    color: 'white',
    margin: '2px',
    padding: '4px',
    borderRadius: '4px',
  },
};

interface PropTypes extends WithStyles<typeof styles> {
  artistInfo: Array<{
    firstName: string,
    lastName: string,
    profile: {
      stageName: string | null,
      genres: Array<string> | null,
      instruments: Array<string> } | null,
    id: string
  }>,
  updateArtistView: (newArtistView: string) => void
}

function ArtistDisplay(props: PropTypes) {
  const { classes, artistInfo, updateArtistView } = props;
  return (
    <div>
      {artistInfo.map((artist) => (
        <Box
          key={artist.id}
          bgcolor="background.paper"
          borderColor="text.secondary"
          border={1}
          className={classes.root}
        >
          <Box flexGrow={1} flexDirection="column" className={classes.nameBox}>
            <Typography variant="h4">
              {`${artist.firstName} ${artist.lastName}`}
            </Typography>
            {
              artist.profile && artist.profile.stageName && (
              <Typography variant="h5">
                aka
                  {' '}
                {artist.profile.stageName}
              </Typography>
              )
            }
            <Link to="/artistview" style={{ color: 'inherit', textDecoration: 'none' }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  updateArtistView(artist.id.toString());
                }}
              >
                View Full Profile
              </Button>
            </Link>
          </Box>
          <Box className={classes.tagBox} textAlign="center">
            <Typography variant="h5">Genres: </Typography>
            {
              artist.profile && artist.profile.genres && artist.profile.genres.map((genre) => (
                <Typography
                  className={classes.tags}
                  variant="overline"
                  key={genre}
                >
                  {genre}
                </Typography>
              ))
            }
            {
              (!artist.profile || !artist.profile.genres) && (
              <Typography variant="overline">
                Artist has not added
                <br />
                genres to profile.
              </Typography>
              )
            }
          </Box>
          <Box textAlign="center" className={classes.tagBox}>
            <Typography variant="h5">Instruments:   </Typography>
            {
              artist.profile && artist.profile.instruments && (
                artist.profile.instruments.map((instrument) => (
                  <Typography
                    className={classes.tags}
                    variant="overline"
                    key={instrument}
                  >
                    {instrument}
                  </Typography>
                )))
            }
            {
              (!artist.profile || !artist.profile.instruments) && (
              <Typography variant="overline">
                Artist has not added
                <br />
                instruments to profile.
              </Typography>
              )
            }
            <br />
          </Box>
        </Box>
      ))}
    </div>
  );
}

export default withStyles(styles)(ArtistDisplay);

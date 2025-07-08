import TextField from '@material-ui/core/TextField';
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { ProfileData } from '../../types';

const styles = {
  root: {
    margin: '10px',
  },
  inputs: {
    width: '70%',
    marginLeft: '15%',
    display: 'flex',
    justifyContent: 'space-between',
  },
  socials: {
    width: '49%',
  },
  buttons: {
    width: '30%',
    marginLeft: '35%',
    display: 'flex',
    justifyContent: 'space-between',
  },
};

interface Props extends WithStyles<typeof styles> {
  editToggle: () => void,
  profileData: ProfileData
}

function InfoEdit(props: Props) {
  const { profileData, editToggle, classes } = props;

  const [stageName, setStageName] = useState<string>(profileData.stageName || '');
  const [bio, setBio] = useState<string>(profileData.bio || '');
  const [genres, setGenres] = useState<string>(profileData.genres?.toString() || '');
  const [instruments, setInstruments] = useState<string>(profileData.instruments?.toString() || '');
  const [twitter, setTwitter] = useState<string>(profileData.twitter || '');
  const [instagram, setInstagram] = useState<string>(profileData.instagram || '');
  const [facebook, setFacebook] = useState<string>(profileData.facebook || '');
  const [bandcamp, setBandcamp] = useState<string>(profileData.bandcamp || '');
  const [spotify, setSpotify] = useState<string>(profileData.spotify || '');
  const [youtube, setYoutube] = useState<string>(profileData.youtube || '');
  const [soundcloud, setSoundcloud] = useState<string>(profileData.soundcloud || '');
  const [examples, setExamples] = useState<string>(profileData.examples || '');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/profile/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          stageName: stageName || null,
          bio: bio || null,
          genres: genres ? genres.split(',').map((item) => item.trim()) : null,
          instruments: instruments ? instruments.split(',').map((item) => item.trim()) : null,
          twitter: twitter || null,
          instagram: instagram || null,
          facebook: facebook || null,
          bandcamp: bandcamp || null,
          spotify: spotify || null,
          youtube: youtube || null,
          soundcloud: soundcloud || null,
          examples: examples ? examples.replace(/'/g, '"') : null,
        }),
      });

      const data = await res.json();
      if (data) {
        editToggle();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={classes.root}>
      <Divider />
      <br />
      <Typography variant="h4" align="center">
        Edit profile information!
      </Typography>
      <Typography variant="subtitle1" align="center">
        Add as little or as much as you please.
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          className={classes.inputs}
          margin="normal"
          label="Stage Name:"
          id="stageName"
          value={stageName}
          variant="outlined"
          onChange={(event) => {
            setStageName(event.target.value);
          }}
        />
        <br />
        <br />
        <TextField
          className={classes.inputs}
          label="Bio:"
          id="bio"
          rows={4}
          multiline
          value={bio}
          variant="outlined"
          onChange={(event) => {
            setBio(event.target.value);
          }}
        />
        <br />
        <br />
        <TextField
          className={classes.inputs}
          label="Genres:"
          id="genres"
          rows={2}
          multiline
          value={genres}
          variant="outlined"
          onChange={(event) => {
            setGenres(event.target.value);
          }}
        />
        <Typography variant="subtitle2" align="center">
          List multiple genres by separating with commas!
        </Typography>
        <br />
        <br />
        <TextField
          className={classes.inputs}
          label="Instruments: "
          id="instruments"
          rows={2}
          multiline
          value={instruments}
          variant="outlined"
          onChange={(event) => {
            setInstruments(event.target.value);
          }}
        />
        <Typography variant="subtitle2" align="center">
          List multiple instruments by separating with commas!
        </Typography>
        <br />
        <br />
        <div className={classes.inputs}>
          <TextField
            className={classes.socials}
            label="Twitter Username:"
            id="twitter"
            multiline={false}
            value={twitter}
            variant="outlined"
            onChange={(event) => {
              setTwitter(event.target.value);
            }}
          />
          <TextField
            className={classes.socials}
            label="Instagram Username:"
            id="instagram"
            value={instagram}
            variant="outlined"
            onChange={(event) => {
              setInstagram(event.target.value);
            }}
          />
        </div>
        <br />
        <br />
        <TextField
          className={classes.inputs}
          label="Facebook Page URL:"
          id="facebook"
          value={facebook}
          variant="outlined"
          onChange={(event) => {
            setFacebook(event.target.value);
          }}
        />
        <br />
        <br />
        <TextField
          className={classes.inputs}
          label="Bandcamp Page URL:"
          id="bandcamp"
          value={bandcamp}
          variant="outlined"
          onChange={(event) => {
            setBandcamp(event.target.value);
          }}
        />
        <br />
        <br />
        <TextField
          className={classes.inputs}
          label="Spotify Artist Page URL: "
          id="spotify"
          value={spotify}
          variant="outlined"
          onChange={(event) => {
            setSpotify(event.target.value);
          }}
        />
        <br />
        <br />
        <TextField
          className={classes.inputs}
          label="Youtube Channel URL: "
          id="youtube"
          value={youtube}
          variant="outlined"
          onChange={(event) => {
            setYoutube(event.target.value);
          }}
        />
        <br />
        <br />
        <TextField
          className={classes.inputs}
          label="Soundcloud Page URL: "
          id="soundcloud"
          value={soundcloud}
          variant="outlined"
          onChange={(event) => {
            setSoundcloud(event.target.value);
          }}
        />
        <br />
        <br />
        <TextField
          className={classes.inputs}
          label="Embedded Examples: "
          id="examples"
          rows={6}
          multiline
          value={examples}
          variant="outlined"
          onChange={(event) => {
            setExamples(event.target.value);
          }}
        />
        <br />
        <br />
        <div className={classes.buttons}>
          <Button
            variant="contained"
            color="primary"
            id="Cancel"
            onClick={() => editToggle()}
          >
            Cancel
          </Button>
          <Button variant="contained" color="secondary" id="Submit" type="submit">
            SAVE
          </Button>
        </div>
      </form>
    </div>
  );
}

export default withStyles(styles)(InfoEdit);

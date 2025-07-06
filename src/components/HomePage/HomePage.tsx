import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const styles = {
  page: {
    margin: '25px',
  },
  title: {
    padding: '10%',
  },
  leftmargin: {
    marginLeft: '50%',
  },
  links: {
    color: 'inherit',
    textDecoration: 'none',
  },
  pals: {
    marginLeft: '15%',
    marginRight: '15%',
    marginTop: '40px',
    marginBottom: '40px',
  },
  tagline: {
    marginRight: '50%',
  },
  myProf: {
    marginTop: '15px',
  },
  btnOne: {
    marginTop: '10px',
    marginBottom: '10px',
  },
};

const defaultProps = {
  bgcolor: 'background.paper',
  m: 1,
  border: 1,
  style: { width: '290px', height: '300px' },
  margin: 'auto',
  marginBottom: '20px',
  marginTop: '20px',
};

interface Props extends WithStyles<typeof styles> {

}

function HomePage({ classes }: Props) {
  return (
    <div className={classes.page}>
      <Typography
        align="center"
        variant="h1"
        gutterBottom
        className={classes.title}
      >
        Welcome to LyeSpace.
      </Typography>
      <hr />
      <div className={classes.page}>
        <Typography variant="h2" gutterBottom display="inline">
          I'm Lye.
        </Typography>
        <Typography
          display="inline"
          gutterBottom
          variant="subtitle2"
        >
          {' '}
          (or lye).
        </Typography>
        <Typography variant="h6" align="center" color="textSecondary" gutterBottom>
          Call me whatever.
        </Typography>
        <Typography variant="h3" gutterBottom align="right" className={classes.leftmargin}>
          I'm always looking for
          <br />
          folks to make music with.
        </Typography>
        <Typography className={classes.pals} align="center" variant="h3" color="primary">
          I made LyeSpace to find pals to make some cool noise with!
        </Typography>
        <Typography gutterBottom className={classes.tagline} variant="h5">
          Here at LyeSpace you can make a profile with information about your music,
          links to your social media, and embed examples of the stuff you have created!
        </Typography>
        <Box justifyContent="center" borderColor="primary.main" {...defaultProps}>
          <Typography gutterBottom className={classes.myProf} align="center" variant="h6">
            Interested in checking
            {' '}
            <br />
            out my profile?
            <br />
            <Link className={classes.links} to="/artistview">
              <Button variant="contained" color="primary" className={classes.btnOne}>
                My Profile
              </Button>
            </Link>
            <br />
            If you like what you see,
            <br />
            go ahead and Sign Up to
            <br />
            make a profile for yourself!
            <br />
            <Link className={classes.links} to="/login">
              <Button
                className={classes.btnOne}
                variant="contained"
                color="secondary"
              >
                Sign up
              </Button>
            </Link>
          </Typography>
        </Box>
        <Typography
          align="right"
          variant="h5"
          color="textSecondary"
          gutterBottom
        >
          I hope you join so
          <br />
          that I can check
          <br />
          out your music!
        </Typography>
        <Typography className={classes.pals} align="center" variant="h2">
          Let's make music together!
        </Typography>
      </div>
    </div>
  );
}

export default withStyles(styles)(HomePage);

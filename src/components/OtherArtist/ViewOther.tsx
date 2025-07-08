import React from 'react';
import Divider from '@material-ui/core/Divider';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import YouTubeIcon from '@material-ui/icons/YouTube';
import Icon from '@material-ui/core/Icon';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import DOMPurify from 'dompurify';
import { ProfileData } from '../../types';

const styles = {
  root: {
    margin: '10px',
    display: 'inline',
  },
  indent: {
    marginLeft: '20px',
  },
  infoMargin: {
    marginBottom: '20px',
  },
  tags: {
    background: '#73817F',
    color: 'white',
    margin: '2px',
    padding: '4px',
    borderRadius: '4px',
  },
  socials: {
    fontSize: '40px',
  },
  bc: {
    fontSize: '30px',
    height: '35px',
  },
  yt: {
    height: '40px',
    fontSize: '40px',
  },
  sc: {
    fontSize: '35px',
    width: '50px',
  },
  spot: {
    fontSize: '35px',
  },
  insetHTML: {
    marginLeft: '10%',
    marginRight: '10%',
  },
};

interface Props extends WithStyles<typeof styles> {
  profileData: ProfileData
}

function ViewOther(props: Props) {
  const { classes, profileData } = props;

  return (
    <div className={classes.root}>
      {
        profileData.stageName
          ? (
            <Typography variant="h5" display="inline">
              aka
              {' '}
              {profileData.stageName}
            </Typography>
          )
          : undefined
      }
      <Divider />
      <br />
      <br />
      {
        profileData.bio
          ? (
            <div>
              <Typography variant="h5">Bio:</Typography>
              <Typography variant="body1" className={classes.indent} paragraph>
                {profileData.bio}
              </Typography>
            </div>
          ) : undefined
      }
      {
        profileData.genres
          ? (
            <div className={classes.infoMargin}>
              <Typography variant="h5">Genres:</Typography>
              <div className={classes.indent}>
                {
              profileData.genres.map((genre) => (
                <Typography
                  variant="overline"
                  className={classes.tags}
                  key={genre}
                >
                  {genre}
                </Typography>
              ))
            }
              </div>
            </div>
          ) : undefined
      }
      {
        profileData.instruments ? (
          <div className={classes.infoMargin}>
            <Typography variant="h5">Instruments: </Typography>
            <div className={classes.indent}>
              {
            profileData.instruments.map((inst) => (
              <Typography
                variant="overline"
                className={classes.tags}
                key={inst}
              >
                {inst}
              </Typography>
            ))
          }
            </div>
          </div>
        ) : undefined
      }
      {
        profileData.twitter || profileData.instagram || profileData.facebook
          ? (
            <div className={classes.infoMargin}>
              <Typography variant="h5">Socials:</Typography>
              <div className={classes.indent}>
                {
              profileData.facebook
                ? (
                  <Link
                    rel="noreferrer"
                    target="_blank"
                    href={profileData.facebook}
                  >
                    <FacebookIcon className={classes.socials} />
                  </Link>
                ) : undefined
            }
                {
              profileData.instagram
                ? (
                  <Link
                    rel="noreferrer"
                    target="_blank"
                    href={`https://instagram.com/${profileData.instagram}`}
                  >
                    <InstagramIcon className={classes.socials} />
                  </Link>
                ) : undefined
              }
                {
              profileData.twitter
                ? (
                  <Link
                    rel="noreferrer"
                    target="_blank"
                    href={`https://twitter.com/${profileData.twitter}`}
                  >
                    <TwitterIcon className={classes.socials} />
                  </Link>
                ) : undefined
            }
              </div>
            </div>
          )
          : undefined
      }
      {
        profileData.bandcamp || profileData.spotify || profileData.youtube || profileData.soundcloud
          ? (
            <div className={classes.infoMargin}>
              <Typography variant="h5">Listen to Music: </Typography>
              <div className={classes.indent}>
                {
              profileData.bandcamp
                ? (
                  <Link
                    rel="noreferrer"
                    target="_blank"
                    href={profileData.bandcamp}
                  >
                    <Icon className={`fa fa-bandcamp ${classes.bc}`} />
                  </Link>
                ) : undefined
            }
                {
              profileData.youtube
                ? (
                  <Link
                    rel="noreferrer"
                    target="_blank"
                    href={profileData.youtube}
                  >
                    <YouTubeIcon className={classes.yt} />
                  </Link>
                ) : undefined
            }
                {
              profileData.soundcloud
                ? (
                  <Link
                    rel="noreferrer"
                    target="_blank"
                    href={profileData.soundcloud}
                  >
                    <Icon className={`fa fa-soundcloud ${classes.sc}`} />
                  </Link>
                ) : undefined
            }
                {
              profileData.spotify
                ? (
                  <Link
                    rel="noreferrer"
                    target="_blank"
                    href={profileData.spotify}
                  >
                    <Icon className={`fa fa-spotify ${classes.spot}`} />
                  </Link>
                ) : undefined
            }
              </div>
            </div>
          ) : undefined
      }

      {
        profileData.examples !== null
          ? (
            <div>
              <Typography variant="h5">Examples:</Typography>
              {
            profileData.examples !== null
              ? (
                <div
                  className={classes.insetHTML}
                  dangerouslySetInnerHTML={
              {
                __html: DOMPurify.sanitize(profileData.examples, {
                  ADD_TAGS: ['iframe', 'div', 'a'],
                  ADD_ATTR: ['width', 'height',
                    'scrolling', 'frameborder', 'allow',
                    'src', 'style', 'href', 'target',
                    'title', 'frameborder', 'allowfullscreen',
                    'allowtransparency'],
                }),
              }
}
                />
              ) : undefined
          }
            </div>
          ) : undefined
      }
    </div>
  );
}

export default withStyles(styles)(ViewOther);

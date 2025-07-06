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

interface propTypes extends WithStyles<typeof styles> {
  profileData: {
    stageName: string | null,
    bio: string | null,
    genres: Array<string> | null,
    instruments: Array<string> | null,
    twitter: string | null,
    instagram: string | null,
    facebook: string | null,
    bandcamp: string | null,
    spotify: string | null,
    youtube: string | null,
    soundcloud: string | null,
    examples: string | null
  },
}

function ViewOther(props: propTypes) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      {
        props.profileData.stageName
          ? (
            <Typography variant="h5" display="inline">
              aka
              {' '}
              {props.profileData.stageName}
            </Typography>
          )
          : undefined
      }
      <Divider />
      <br />
      <br />
      {
        props.profileData.bio
          ? (
            <div>
              <Typography variant="h5">Bio:</Typography>
              <Typography variant="body1" className={classes.indent} paragraph>
                {props.profileData.bio}
              </Typography>
            </div>
          ) : undefined
      }
      {
        props.profileData.genres
          ? (
            <div className={classes.infoMargin}>
              <Typography variant="h5">Genres:</Typography>
              <div className={classes.indent}>
                {
              props.profileData.genres.map((genre) => (
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
        props.profileData.instruments ? (
          <div className={classes.infoMargin}>
            <Typography variant="h5">Instruments: </Typography>
            <div className={classes.indent}>
              {
            props.profileData.instruments.map((inst) => (
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
        props.profileData.twitter || props.profileData.instagram || props.profileData.facebook
          ? (
            <div className={classes.infoMargin}>
              <Typography variant="h5">Socials:</Typography>
              <div className={classes.indent}>
                {
              props.profileData.facebook
                ? (
                  <Link
                    rel="noreferrer"
                    target="_blank"
                    href={props.profileData.facebook}
                  >
                    <FacebookIcon className={classes.socials} />
                  </Link>
                ) : undefined
            }
                {
              props.profileData.instagram
                ? (
                  <Link
                    rel="noreferrer"
                    target="_blank"
                    href={`https://instagram.com/${props.profileData.instagram}`}
                  >
                    <InstagramIcon className={classes.socials} />
                  </Link>
                ) : undefined
              }
                {
              props.profileData.twitter
                ? (
                  <Link
                    rel="noreferrer"
                    target="_blank"
                    href={`https://twitter.com/${props.profileData.twitter}`}
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
        props.profileData.bandcamp || props.profileData.spotify || props.profileData.youtube || props.profileData.soundcloud
          ? (
            <div className={classes.infoMargin}>
              <Typography variant="h5">Listen to Music: </Typography>
              <div className={classes.indent}>
                {
              props.profileData.bandcamp
                ? (
                  <Link
                    rel="noreferrer"
                    target="_blank"
                    href={props.profileData.bandcamp}
                  >
                    <Icon className={`fa fa-bandcamp ${classes.bc}`} />
                  </Link>
                ) : undefined
            }
                {
              props.profileData.youtube
                ? (
                  <Link
                    rel="noreferrer"
                    target="_blank"
                    href={props.profileData.youtube}
                  >
                    <YouTubeIcon className={classes.yt} />
                  </Link>
                ) : undefined
            }
                {
              props.profileData.soundcloud
                ? (
                  <Link
                    rel="noreferrer"
                    target="_blank"
                    href={props.profileData.soundcloud}
                  >
                    <Icon className={`fa fa-soundcloud ${classes.sc}`} />
                  </Link>
                ) : undefined
            }
                {
              props.profileData.spotify
                ? (
                  <Link
                    rel="noreferrer"
                    target="_blank"
                    href={props.profileData.spotify}
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
        props.profileData.examples !== null
          ? (
            <div>
              <Typography variant="h5">Examples:</Typography>
              {
            props.profileData.examples !== null
              ? (
                <div
                  className={classes.insetHTML}
                  dangerouslySetInnerHTML={
              {
                __html: DOMPurify.sanitize(props.profileData.examples, {
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

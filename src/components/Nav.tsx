import React from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const styles = {
  root: {
    flexGrow: 1,
    background: '#1A302D',
  },
  title: {
    flexGrow: 1,
    fontSize: '1.3rem',
  },
  links: {
    color: 'inherit',
    textDecoration: 'none',
  },
};

interface Props extends WithStyles<typeof styles> {
  token: string | null,
  logout: Function
}

class Nav extends React.Component<Props> {
  clickLogout(e: React.MouseEvent) {
    this.props.logout();
  }

  render() {
    const { classes } = this.props;

    return (
      <AppBar position="sticky" className={classes.root}>
        <Toolbar>
          <Typography className={classes.title}>
            <Link to="/" className={classes.links}>
              LyeSpace
            </Link>
          </Typography>
          <Link to="/artists" className={classes.links}>
            <Button color="inherit">View Artists</Button>
          </Link>
          {this.props.token ? (
            <Button
              color="inherit"
              onClick={(e) => this.clickLogout(e)}
            >
              Logout
            </Button>
          ) : (
            <Link to="/login" className={classes.links}>
              <Button color="inherit">Login</Button>
            </Link>
          )}
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(styles)(Nav);

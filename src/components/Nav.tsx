import React from 'react';
import { withStyles, WithStyles } from "@material-ui/core/styles";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';

const styles = {
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
    }
  }

  interface Props extends WithStyles<typeof styles>{ 
    token: string | null,
    logout: Function
  }


class Nav extends React.Component<Props> {

  clickLogout(e: React.MouseEvent){
    this.props.logout()
  }

  render() {
    const {classes} = this.props

    return (
        <AppBar position="sticky" className={classes.root}>
          <Toolbar>
              <Typography className={classes.title}>
                <Link to="/">
                  LyeSpace
                </Link>
              </Typography>
            <Link to="/artists">
              <Button color="inherit" >View Artists</Button>
            </Link>
            {this.props.token ? <Button color="secondary" onClick={e => this.clickLogout(e)}>Logout</Button> : <Link to="/login"><Button color="inherit" >Login</Button></Link>}
          </Toolbar>
        </AppBar>
    )}
}

export default withStyles(styles)(Nav);
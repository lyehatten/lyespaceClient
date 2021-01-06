import React from 'react';
import { withStyles, WithStyles } from "@material-ui/core/styles";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


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
  constructor(props: any){
    super(props);

  }

  clickLogout(e: React.MouseEvent){
    this.props.logout()
  }

  render() {
    const {classes} = this.props

    return (
      <div className={classes.root} >
        <AppBar position="static">
          <Toolbar>
              <Typography className={classes.title}>
                <Button color="inherit" type="button" href="/">
                  LyeSpace
                </Button>
              </Typography>
            <Button color="inherit" href="/artists">View Artists</Button>
            {this.props.token ? <Button color="inherit" onClick={e => this.clickLogout(e)}>Logout</Button> : <Button color="inherit" href="/login">Login</Button>}
          </Toolbar>
        </AppBar>
      </div>
    )}
}

export default withStyles(styles)(Nav);
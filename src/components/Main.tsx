import React, { useCallback, useEffect, useState } from 'react';
import {
  BrowserRouter as Router, Switch, Route,
} from 'react-router-dom';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import Nav from './Nav';
import LoginRoute from './ViewConductors/LoginRoute';
import HomeRoute from './ViewConductors/HomeRoute';
import ViewArtists from './ViewArtists/ViewArtists';
import ArtistRoute from './ViewConductors/ArtistRoute';
import { UserTypes } from '../types';

const styles = {
  setBackground: {
    background: 'linear-gradient(0deg, hsla(172, 30%, 15%, 0.6) 49%, hsla(143, 50%, 56%, 0.6) 100%) fixed',
    backgroundSize: 'cover',
    paddingBottom: '5%',
    minHeight: '100vh',
  },
  wrapper: {
    background: '#FEFAF6',
    marginTop: '-25px',
    marginRight: '5%',
    marginLeft: '5%',
    padding: '10px',
    boxShadow: '0px 3px 17px 4px rgba(104,99,94,0.94)',
  },
};

interface Props extends WithStyles<typeof styles> {

}

function Main(props: Props) {
  const { classes } = props;

  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [role, setRole] = useState<UserTypes | null>(null);
  const [artistView, setArtistView] = useState<string | null>(null);

  function updateUserInfo() {
    setToken(localStorage.getItem('token') || '');
    setUserId(localStorage.getItem('userId') || '');
    setRole(localStorage.getItem('role') as UserTypes);
  }

  const updateUserCallback = useCallback(
    () => {
      updateUserInfo();
    },
    [],
  );

  useEffect(() => {
    if (localStorage.getItem('token')) {
      updateUserInfo();
    }
  }, [userId]);

  function logout() {
    localStorage.clear();
    setToken('');
    setUserId('');
    setRole(null);
  }

  return (
    <div className={classes.setBackground}>
      <Router>
        <Nav logout={() => logout} token={token} />
        <div className={classes.wrapper}>
          <Switch>
            <Route exact path="/">
              <HomeRoute
                token={token}
              />
            </Route>
            <Route exact path="/artistview">
              <ArtistRoute
                role={role}
                artistView={artistView}
              />
            </Route>
            <Route exact path="/artists">
              <ViewArtists updateArtistView={setArtistView} />
            </Route>
            <Route exact path="/login">
              <LoginRoute
                token={token}
                updateUserInfo={updateUserCallback}
              />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default withStyles(styles)(Main);

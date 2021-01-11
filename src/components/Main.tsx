import React from 'react';
import Nav from './Nav';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import LoginRoute from './ViewConductors/LoginRoute';
import HomeRoute from './ViewConductors/HomeRoute';
import ViewArtists from './ViewArtists/ViewArtists';
import ArtistRoute from './ViewConductors/ArtistRoute';
import { withStyles, WithStyles } from "@material-ui/core/styles";


type mainStates = {
    token: string | null,
    userId: string | null,
    role: string | null,
    artistView: string
}

const styles ={
  setBackground: {
    background: "linear-gradient(0deg, hsla(172, 30%, 15%, 0.6) 49%, hsla(143, 50%, 56%, 0.6) 100%) fixed",
    backgroundSize: 'cover',
    paddingBottom: '5%',
    minHeight: '100vh'
  },
  wrapper: {
    background: '#FEFAF6',
    marginTop: '-25px',
    marginRight: "5%",
    marginLeft: '5%',
    padding: "10px",
    boxShadow: '0px 3px 17px 4px rgba(104,99,94,0.94)'
  }
}

interface Props extends WithStyles<typeof styles>{

}

class Main extends React.Component < Props, mainStates>{
  _isMounted = false;
  constructor(props: Props){
      super(props);
      this.state = {
          token: null,
          userId: null,
          role: null,
          artistView: "1"
      }
  }

  updateToken = (newToken: string) => {
      this.setState({token: newToken})
      localStorage.setItem('token', newToken);
  }

  updateUserId = (newUserId: string) => {
      this.setState({userId: newUserId})
      localStorage.setItem('userId', newUserId);
  }

  updateArtistView = (newArtistView: string) => {
      this.setState({artistView: newArtistView})
  }

  updateRole = (newRole: string) => {
      this.setState({role: newRole})
      localStorage.setItem('role', newRole);
  }

  logout = () => {
    localStorage.clear();
    this.setState({
      token: null,
      userId: null,
      role: null
    })
    this.componentDidMount()
  }

  componentDidMount() {
      this._isMounted = true;
      if (localStorage.getItem('token')){
          this.setState({
            token: localStorage.getItem('token'),
            role: localStorage.getItem('role'),
            userId: localStorage.getItem("userId")
          });
        }
  }

  componentWillUnmount(){
      this._isMounted = false;
  }

  render(){
  const {classes} = this.props
  return (
    <React.Fragment>
        <div className={classes.setBackground}>
            <Router>
              <Nav logout={this.logout} token={this.state.token}/>
          <div className={classes.wrapper} >
              <Switch>
                <Route exact path="/">
                  <HomeRoute logout={this.logout} token={this.state.token} userId={this.state.userId}/>
                </Route>
                <Route exact path="/artistview">
                  <ArtistRoute updateArtistView={this.updateArtistView} 
                  logout={this.logout} token={this.state.token} userId={this.state.userId} 
                  role={this.state.role} artistView={this.state.artistView}/> 
                </Route>
                <Route exact path="/artists">
                  <ViewArtists updateArtistView={this.updateArtistView}/>
                </Route>
                <Route exact path="/login" >
                  <LoginRoute logout={this.logout} userId={this.state.userId} token={this.state.token} 
                  updateToken={this.updateToken} updateUserId={this.updateUserId} updateRole={this.updateRole}/>
                </Route>
              </Switch>
          </div>
            </Router>
        </div>
    </React.Fragment>
  )}
}

export default withStyles(styles)(Main);
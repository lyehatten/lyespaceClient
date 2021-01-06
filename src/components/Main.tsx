import React from 'react';
import Nav from './Nav';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import LoginRoute from './ViewConductors/LoginRoute';
import HomeRoute from './ViewConductors/HomeRoute';
import ViewArtists from './ViewArtists/ViewArtists';
import ArtistRoute from './ViewConductors/ArtistRoute';

type mainStates = {
    token: string | null,
    userId: string | null,
    role: string | null,
    artistView: string
}

class Main extends React.Component <{}, mainStates>{
    _isMounted = false;
    constructor(props: mainStates){
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
    return (
        <React.Fragment>
            <Router>
                <Nav logout={this.logout} token={this.state.token}/>
                <Switch>
                    <Route exact path="/"><HomeRoute token={this.state.token} userId={this.state.userId}/></Route>
                    <Route exact path="/artistview"><ArtistRoute token={this.state.token} userId={this.state.userId} artistView={this.state.artistView}/> </Route>
                    <Route exact path="/artists"><ViewArtists updateArtistView={this.updateArtistView}/></Route>
                    <Route exact path="/login" ><LoginRoute userId={this.state.userId} token={this.state.token} updateToken={this.updateToken} updateUserId={this.updateUserId} updateRole={this.updateRole}/></Route>
                </Switch>
            </Router>
        </React.Fragment>
    )}
}

export default Main;
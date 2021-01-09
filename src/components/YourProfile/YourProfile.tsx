import { Button } from '@material-ui/core';
import React from 'react';
import InfoCreate from './InfoCreate';
import InfoDisplay from './InfoDisplay';
import InfoEdit from './InfoEdit';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Posts from './Posts/Posts';

type Props = {
  userId: string | null,
  logout: Function
}

type States = {
  deleteState: boolean,
  firstName: string,
  lastName: string,
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
  } | null,
  posts: Array<{id: number, post: string, createdAt: string}> | null,
  editView: boolean
}


class YourProfile extends React.Component<Props, States> {
  constructor(props: Props){
    super(props);
    this.refresh = this.refresh.bind(this);
    this.state = {
      deleteState: false,
      firstName: "",
      lastName: "",
      profileData: null,
      editView: false,
      posts: null
    }
  }



  componentDidMount(){
    fetch(`https://lyespace-server.herokuapp.com/user/userInfo/${this.props.userId}`)
    .then(res => res.json())
    .then(data => this.setState({
      firstName: data.firstName,
      lastName: data.lastName,
      profileData: data.profile,
      posts: data.posts
    }))
    .catch(error => console.log(error))
  }


  refresh(userId: string){
    fetch(`https://lyespace-server.herokuapp.com/user/userInfo/${userId}`)
    .then(res => res.json())
    .then(data => this.setState({
      posts: data.posts
    }))
    .catch(error => console.log(error))
  }


  editToggle = () => {
    this.setState({
      editView: !this.state.editView
    })
  }

  handleClickOpen = () => {
    this.setState({ deleteState: true });
  };

  handleClose = () => {
    this.setState({ deleteState: false });
  };

  handleDelete = () => {
    fetch(`https://lyespace-server.herokuapp.com/user/removeSelf`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${localStorage.getItem('token')}`
      }
  })
  .then(data => this.setState({ deleteState: false }))
  .then(data => this.props.logout())
  .then(data => window.location.reload())
  .catch(error => console.log(error))
  }


  render(){
    return(
      <div>
        <h1>{this.state.firstName} {this.state.lastName}</h1>
        {this.state.profileData ? this.state.editView ? <InfoEdit editToggle={this.editToggle} profileData={this.state.profileData}/> : 
        <InfoDisplay editToggle={this.editToggle} profileData={this.state.profileData}/ > : this.state.editView ? <InfoCreate editToggle={this.editToggle}/> :
        <><p>You have no profile data! Add some?</p> <Button onClick={this.editToggle} >Create Profile</Button></>
        }
        <Button onClick={() => this.handleClickOpen()}>Delete Account</Button>
        <Dialog
          open={this.state.deleteState}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete your account? 
              <br/>
              You will not be able to log back in and will need to sign up again.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleDelete} color="primary" autoFocus>
              Delete Account
            </Button>
          </DialogActions>
        </Dialog>
        <Posts posts={this.state.posts} refresh={this.refresh} userId={this.props.userId}/>
      </div>
    )
  }

}

export default YourProfile;
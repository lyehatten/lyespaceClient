import React from "react";
import ViewOther from "./ViewOther";
import { Button } from "@material-ui/core";
import ViewPosts from "./ViewPosts";


type Props = {
  artistView: string,
  role: string | null,
  updateArtistView: Function
}


type States = {
  firstName: string,
  lastName: string,
  role: string,
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
}

class FetchOther extends React.Component<Props, States> {  
  constructor(props: Props){
  super(props);
  this.state = {
    firstName: "",
    lastName: "",
    profileData: null,
    role: "",
    posts: null
    }
}


componentDidMount(){
  fetch(`https://lyespace-server.herokuapp.com/user/userInfo/${this.props.artistView}`)
  .then(res => res.json())
  .then(data => this.setState({
    firstName: data.firstName,
    lastName: data.lastName,
    profileData: data.profile,
    role: data.userType,
    posts: data.posts
  }))
  .catch(err => console.log(err))
}

componentWillUnmount(){
  this.props.updateArtistView(1)
}


  promoteUser = () => {
    fetch(`https://lyespace-server.herokuapp.com/user/role/${this.props.artistView}`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `${localStorage.getItem('token')}`
      }
    })
    .then(res => res.json())
    .then( data => {
      fetch(`https://lyespace-server.herokuapp.com/user/userInfo/${this.props.artistView}`)
      .then(res => res.json())
      .then(data => this.setState({
        firstName: data.firstName,
        lastName: data.lastName,
        profileData: data.profile,
        role: data.userType
      }))
      .catch(error => console.log(error))
    }
    )
    .catch( error => console.log(error))
  }

  adminRemovePost = (id: number) => {
    fetch(`https://lyespace-server.herokuapp.com/posts/adminRemove/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${localStorage.getItem('token')}`
      }
  })
  .then(data => {
    fetch(`https://lyespace-server.herokuapp.com/user/userInfo/${this.props.artistView}`)
  .then(res => res.json())
  .then(data => this.setState({
    firstName: data.firstName,
    lastName: data.lastName,
    profileData: data.profile,
    role: data.userType,
    posts: data.posts
  }))
  .catch(err => console.log(err))
  })
  .catch(error => console.log(error))
  }

  removeAdmin = () => {
    fetch(`https://lyespace-server.herokuapp.com/user/removeAdmin/${this.props.artistView}`, {
      method: 'Delete',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `${localStorage.getItem('token')}`
      }
    })
    .then(res => res.json())
    .then(data => window.location.reload())
    .catch( error => console.log(error))
  
  }

  render(){
    
    return(
      <div>
        <h1>{this.state.firstName} {this.state.lastName}</h1>
        {this.state.profileData ? <ViewOther profileData={this.state.profileData}/ > : 
        <h4>User has no profile data!</h4>
        }
        {this.state.posts ? <ViewPosts posts={this.state.posts} admin={this.props.role} adminRemovePost={this.adminRemovePost}/> : undefined}
        {this.props.role === "big boss" ? this.state.role === "bandmate" ? <div><Button onClick={() => {this.removeAdmin()}}>Remove Profile</Button></div> :
          <div>{this.state.role}<Button onClick={() => {this.promoteUser()}}>Promote to Bandmate</Button><Button onClick={() => {this.removeAdmin()}}>Remove Profile</Button></div> : undefined
        }
        {this.props.role === "bandmate" ? 
          <Button>Remove Profile</Button> : undefined
        }
      </div>
    )
  }
}

export default FetchOther;
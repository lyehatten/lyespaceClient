import { Button } from '@material-ui/core';
import React from 'react';
import InfoCreate from './InfoCreate';
import InfoDisplay from './InfoDisplay';
import InfoEdit from './InfoEdit';

type Props = {
  userId: string | null
}

type States = {
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
    bandcampExamples: Array<string> | null,
    spotify: string | null,
    spotifyExamples: Array<string> | null,
    youtube: string | null,
    youtubeExamples: Array<string> | null,
    soundcloud: string | null,
    soundcloudExamples: Array<string> | null
  } | null,
  editView: boolean
}


class YourProfile extends React.Component<Props, States> {
  constructor(props: Props){
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      profileData: null,
      editView: false
    }
  }


  componentDidMount(){
    fetch(`https://lyespace-server.herokuapp.com/user/userInfo/${this.props.userId}`)
    .then(res => res.json())
    .then(data => this.setState({
      firstName: data.firstName,
      lastName: data.lastName,
      profileData: data.profile
    }))
  }

  editToggle = () => {
    this.setState({
      editView: !this.state.editView
    })
  }


  render(){
    return(
      <div>
        <h1>{this.state.firstName} {this.state.lastName}</h1>
        {this.state.profileData ? this.state.editView ? <InfoEdit editToggle={this.editToggle} profileData={this.state.profileData}/> : 
        <InfoDisplay editToggle={this.editToggle}/ > : this.state.editView ? <InfoCreate editToggle={this.editToggle}/> :
        <><p>You have no profile data! Add some?</p> <Button onClick={this.editToggle} >Create Profile</Button></>
        }
      </div>
    )
  }

}

export default YourProfile;
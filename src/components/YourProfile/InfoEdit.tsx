import TextField from '@material-ui/core/TextField';
import React from 'react';
import Button from '@material-ui/core/Button';

type Props = {
  editToggle: Function,
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
  },
}

type States = {
  stageName: string,
  bio: string,
  genres: string,
  instruments: string,
  twitter: string,
  instagram: string,
  facebook: string,
  bandcamp: string,
  bandcampExamples: string,
  spotify: string,
  spotifyExamples: string,
  youtube: string,
  youtubeExamples: string,
  soundcloud: string,
  soundcloudExamples: string
}

export default class InfoCreate extends React.Component<Props, States> {
  constructor(props: Props){
    super(props);
    this.state = {
      stageName: this.props.profileData.stageName ? this.props.profileData.stageName : "",
      bio: this.props.profileData.bio ? this.props.profileData.bio : "",
      genres: this.props.profileData.genres ? this.props.profileData.genres.toString() : "",
      instruments: this.props.profileData.instruments ? this.props.profileData.instruments.toString() : "",
      twitter: this.props.profileData.twitter ? this.props.profileData.twitter : "",
      instagram: this.props.profileData.instagram ? this.props.profileData.instagram : "",
      facebook: this.props.profileData.facebook ? this.props.profileData.facebook : "",
      bandcamp: this.props.profileData.bandcamp ? this.props.profileData.bandcamp : "",
      bandcampExamples: this.props.profileData.bandcampExamples ? this.props.profileData.bandcampExamples.toString() : "",
      spotify: this.props.profileData.spotify ? this.props.profileData.spotify : "",
      spotifyExamples: this.props.profileData.spotifyExamples ? this.props.profileData.spotifyExamples.toString() : "",
      youtube: this.props.profileData.youtube ? this.props.profileData.youtube : "",
      youtubeExamples: this.props.profileData.youtubeExamples ? this.props.profileData.youtubeExamples.toString() : "",
      soundcloud: this.props.profileData.soundcloud ? this.props.profileData.soundcloud : "",
      soundcloudExamples: this.props.profileData.soundcloudExamples ? this.props.profileData.soundcloudExamples.toString() : "",
    }
  }

  returnArray(string: string) {
    if(string === ""){
      return null
    } else {
      let newArray: Array<string> = string.split(",").map(item => item.trim() )
      return newArray
    }
  }

  checkState(string: string | null) {
    if(string === "") {
      return null
    } else {
      return string
    }
  }

  HandleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
        
    fetch('https://lyespace-server.herokuapp.com/profile/update', {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        stageName: this.checkState(this.state.stageName),
        bio: this.checkState(this.state.bio),
        genres: this.returnArray(this.state.genres),
        instruments: this.returnArray(this.state.instruments),
        twitter: this.checkState(this.state.twitter),
        instagram: this.checkState(this.state.instagram),
        facebook: this.checkState(this.state.facebook),
        bandcamp: this.checkState(this.state.bandcamp),
        bandcampExamples: this.returnArray(this.state.bandcampExamples),
        spotify: this.checkState(this.state.spotify),
        spotifyExamples: this.returnArray(this.state.spotifyExamples),
        youtube: this.checkState(this.state.youtube),
        youtubeExamples: this.returnArray(this.state.youtubeExamples),
        soundcloud: this.checkState(this.state.soundcloud),
        soundcloudExamples: this.returnArray(this.state.soundcloudExamples)
      })
    })
    .then(res => res.json())
    .then(data => window.location.reload(true))
    .catch( error => console.log(error))
  }


  render(){
      return(
      <div>
        <h3>Edit profile information!</h3>
        <h5>Add as little or as much as you please.</h5>
        <form onSubmit={this.HandleSubmit}>
          <TextField 
            label="Stage Name:"
            id="stageName" 
            value={this.state.stageName} 
            variant="outlined"
            onChange={(event) => {                 
            this.setState({stageName: event.target.value});  
            }}
          />
          <br/>
          <br/>
          <TextField 
            label="Bio:"
            id="bio" 
            rows={4}
            multiline={true}
            value={this.state.bio} 
            variant="outlined"
            onChange={(event) => {                 
            this.setState({bio: event.target.value});  
            }}
          />
          <br/>
          <br/>
          <TextField 
            label="Genres:"
            id="genres" 
            rows={2}
            multiline={true}
            value={this.state.genres} 
            variant="outlined"
            onChange={(event) => {                 
            this.setState({genres: event.target.value});  
            }}
          />
          <p>List multiple genres by separating with commas!</p>
          <br/>
          <br/>
          <TextField 
            label="Instruments: "
            id="instruments" 
            rows={2}
            multiline={true}
            value={this.state.instruments} 
            variant="outlined"
            onChange={(event) => {                 
            this.setState({instruments: event.target.value});  
            }}
          />
          <p>List multiple instruments by separating with commas!</p>
          <br/>
          <br/>
          <TextField 
            label="Twitter:"
            id="twitter" 
            multiline={false}
            value={this.state.twitter} 
            variant="outlined"
            onChange={(event) => {                 
            this.setState({twitter: event.target.value});  
            }}
          />
          <br/>
          <br/>
          <TextField 
            label="Instagram:"
            id="instagram" 
            value={this.state.instagram} 
            variant="outlined"
            onChange={(event) => {                 
            this.setState({instagram: event.target.value});  
            }}
          />
          <br/>
          <br/>
          <TextField 
            label="Facebook Page:"
            id="facebook" 
            value={this.state.facebook} 
            variant="outlined"
            onChange={(event) => {                 
            this.setState({facebook: event.target.value});  
            }}
          />
          <br/>
          <br/>
          <TextField 
            label="Bandcamp:"
            id="bandcamp" 
            value={this.state.bandcamp} 
            variant="outlined"
            onChange={(event) => {                 
            this.setState({bandcamp: event.target.value});  
            }}
          />
          <br/>
          <br/>
          <TextField 
            label="Bandcamp Examples:"
            id="bandcampExamples" 
            rows={4}
            multiline={true}
            value={this.state.bandcampExamples} 
            variant="outlined"
            onChange={(event) => {                 
            this.setState({bandcampExamples: event.target.value});  
            }}
          />
          <p>List multiple Examples by separating with commas!</p>
          <br/>
          <br/>
          <TextField 
            label="Spotify: "
            id="spotify" 
            value={this.state.spotify} 
            variant="outlined"
            onChange={(event) => {                 
            this.setState({spotify: event.target.value});  
            }}
          />
          <br/>
          <br/>
          <TextField 
            label="Spotify Examples: "
            id="spotifyExamples" 
            rows={4}
            multiline={true}
            value={this.state.spotifyExamples} 
            variant="outlined"
            onChange={(event) => {                 
            this.setState({spotifyExamples: event.target.value});  
            }}
          />
          <p>List multiple examples by separating with commas!</p>
          <br/>
          <br/>
          <TextField 
            label="Youtube: "
            id="youtube" 
            value={this.state.youtube} 
            variant="outlined"
            onChange={(event) => {                 
            this.setState({youtube: event.target.value});  
            }}
          />
          <br/>
          <br/>
          <TextField 
            label="Youtube Examples: "
            id="youtubeExamples" 
            rows={4}
            multiline={true}
            value={this.state.youtubeExamples} 
            variant="outlined"
            onChange={(event) => {                 
            this.setState({youtubeExamples: event.target.value});  
            }}
          />
          <p>List multiple examples by separating with commas!</p>
          <br/>
          <br/>
          <TextField 
            label="Soundcloud: "
            id="soundcloud" 
            value={this.state.soundcloud} 
            variant="outlined"
            onChange={(event) => {                 
            this.setState({soundcloud: event.target.value});  
            }}
          />
          <br/>
          <br/>
          <TextField 
            label="Soundcloud Examples: "
            id="soundcloudExamples" 
            rows={4}
            multiline={true}
            value={this.state.soundcloudExamples} 
            variant="outlined"
            onChange={(event) => {                 
            this.setState({soundcloudExamples: event.target.value});  
            }}
          />
          <p>List multiple examples by separating with commas!</p>
          <br/>
          <br/>
          <Button variant="outlined" color="inherit" id="Submit" type="submit">SAVE</Button><Button variant="outlined" color="inherit" id="Cancel" onClick={() => {this.props.editToggle()}}>Cancel</Button>
        </form>
      </div>
    )
  }
}
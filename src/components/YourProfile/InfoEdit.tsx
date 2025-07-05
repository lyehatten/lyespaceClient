import TextField from '@material-ui/core/TextField';
import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles, WithStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

const styles = {
  root: {
    margin: '10px'
  },
  inputs: {
    width: '70%',
    marginLeft: '15%',
    display: 'flex',
    justifyContent: 'space-between'
  },
  socials: {
    width: "49%"
  },
  buttons: {
    width: '30%',
    marginLeft: '35%',
    display: 'flex',
    justifyContent: 'space-between'
  }
}


interface Props extends WithStyles<typeof styles> {
  editToggle: () => void,
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
  spotify: string,
  youtube: string,
  soundcloud: string,
  examples: string
}

class InfoEdit extends React.Component<Props, States> {
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
      spotify: this.props.profileData.spotify ? this.props.profileData.spotify : "",
      youtube: this.props.profileData.youtube ? this.props.profileData.youtube : "",
      soundcloud: this.props.profileData.soundcloud ? this.props.profileData.soundcloud : "",
      examples: this.props.profileData.examples ? this.props.profileData.examples : "",
    }
  }

  changeQuotes(string: string | null){
    if(string ==="" || null){
      return null
    } else if (string === null){
      return null
    } else {
      return string.replace(/'/g, '"');
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
        
    fetch(`${process.env.REACT_APP_API_URL}/profile/update`, {
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
        spotify: this.checkState(this.state.spotify),
        youtube: this.checkState(this.state.youtube),
        soundcloud: this.checkState(this.state.soundcloud),
        examples: this.changeQuotes(this.state.examples)
      })
    })
    .then(res => res.json())
    .then(data => this.props.editToggle())
    .then(data => window.location.reload())
    .catch( error => console.log(error))
  }


  render(){
    const {classes} = this.props
      return(
      <div className={classes.root}>
        <Divider/>
        <br/>
        <Typography variant="h4" align="center">
          Edit profile information!
        </Typography>
        <Typography variant="subtitle1" align="center">
          Add as little or as much as you please.
        </Typography>
        <form onSubmit={this.HandleSubmit}>
        <TextField className={classes.inputs}
            margin="normal"
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
          <TextField className={classes.inputs}
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
          <TextField className={classes.inputs}
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
          <Typography variant="subtitle2" align="center">
            List multiple genres by separating with commas!
          </Typography>
          <br/>
          <br/>
          <TextField className={classes.inputs}
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
          <Typography variant="subtitle2" align="center">
            List multiple instruments by separating with commas!
          </Typography>
          <br/>
          <br/>
          <div className={classes.inputs}>
            <TextField className={classes.socials}
              label="Twitter Username:"
              id="twitter" 
              multiline={false}
              value={this.state.twitter} 
              variant="outlined"
              onChange={(event) => {                 
              this.setState({twitter: event.target.value});  
              }}
            />
            <TextField className={classes.socials}
              label="Instagram Username:"
              id="instagram" 
              value={this.state.instagram} 
              variant="outlined"
              onChange={(event) => {                 
              this.setState({instagram: event.target.value});  
              }}
            />
          </div>
          <br/>
          <br/>
          <TextField className={classes.inputs}
            label="Facebook Page URL:"
            id="facebook" 
            value={this.state.facebook} 
            variant="outlined"
            onChange={(event) => {                 
            this.setState({facebook: event.target.value});  
            }}
          />
          <br/>
          <br/>
          <TextField className={classes.inputs}
            label="Bandcamp Page URL:"
            id="bandcamp" 
            value={this.state.bandcamp} 
            variant="outlined"
            onChange={(event) => {                 
            this.setState({bandcamp: event.target.value});  
            }}
          />
          <br/>
          <br/>
          <TextField className={classes.inputs}
            label="Spotify Artist Page URL: "
            id="spotify" 
            value={this.state.spotify} 
            variant="outlined"
            onChange={(event) => {                 
            this.setState({spotify: event.target.value});  
            }}
          />
          <br/>
          <br/>
          <TextField className={classes.inputs}
            label="Youtube Channel URL: "
            id="youtube" 
            value={this.state.youtube} 
            variant="outlined"
            onChange={(event) => {                 
            this.setState({youtube: event.target.value});  
            }}
          />
          <br/>
          <br/>
          <TextField className={classes.inputs}
            label="Soundcloud Page URL: "
            id="soundcloud" 
            value={this.state.soundcloud} 
            variant="outlined"
            onChange={(event) => {                 
            this.setState({soundcloud: event.target.value});  
            }}
          />
          <br/>
          <br/>
          <TextField className={classes.inputs}
            label="Embedded Examples: "
            id="examples" 
            rows={6}
            multiline={true}
            value={this.state.examples} 
            variant="outlined"
            onChange={(event) => {                 
            this.setState({examples: event.target.value});  
            }}
          />
          <br/>
          <br/>
          <div className={classes.buttons}>
            <Button variant="contained" color="primary" id="Cancel" 
            onClick={() => {this.props.editToggle()}}>
              Cancel
            </Button>
            <Button variant="contained" color="secondary" id="Submit" type="submit">
              SAVE
            </Button>
          </div>
        </form>
      </div>
    )
  }
}

export default withStyles(styles)(InfoEdit);
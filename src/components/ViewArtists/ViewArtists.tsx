import React from 'react';
import ArtistDisplay from './ArtistDisplay';
import { withStyles, WithStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';

const styles = {
  root: {
    margin: '25px'
  }
}

interface Props extends WithStyles<typeof styles> {
  updateArtistView: (newArtistView: string) => void
}

type States = {
  artistInfo: Array<{
    firstName: string, 
    lastName: string, 
    profile: {
      stageName: string | null, 
      genres: Array<string> | null, 
      instruments: Array<string>
    } | null, 
    id: number
  }>
}



class ViewArtists extends React.Component<Props, States> {
  constructor(props: Props){
    super(props);
    this.state={
      artistInfo: []
    }
  }

  componentDidMount(){
    fetch(`${process.env.REACT_APP_API_URL}/user/findAll`)
    .then(res => res.json())
    .then(data => this.setState({artistInfo: data}))
  }

  render(){
    const {classes} = this.props
    return(
      <div>
        <Typography className={classes.root} variant="h2">
          All Artist Profiles:
        </Typography>
        <ArtistDisplay artistInfo={this.state.artistInfo} 
        updateArtistView={this.props.updateArtistView}/>
      </div>
    )
  }
}


export default withStyles(styles)(ViewArtists);
import React from 'react';
import ArtistDisplay from './ArtistDisplay';

type Props = {
  updateArtistView: Function
}

type States = {
  artistInfo: Array<{firstName: string, lastName: string, profile: {stageName: string | null, genres: Array<string> | null, instruments: Array<string>} | null, id: number}>
}


class ViewArtists extends React.Component<Props, States> {
  constructor(props: Props){
    super(props);
    this.state={
      artistInfo: []
    }
  }

  componentDidMount(){
    fetch('https://lyespace-server.herokuapp.com/user/findAll')
    .then(res => res.json())
    .then(data => this.setState({artistInfo: data}))
  }

  render(){
    return(
      <div>
        <h1>All Artist Profiles:</h1>
        <ArtistDisplay artistInfo={this.state.artistInfo} updateArtistView={this.props.updateArtistView}/>
      </div>
    )
  }
}


export default ViewArtists;
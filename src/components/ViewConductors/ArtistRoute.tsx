import React from 'react';
import FetchOther from '../OtherArtist/FetchOther';
import YourProfile from '../YourProfile/YourProfile';

type PropTypes = {
  token: string | null,
  userId: string | null,
  artistView: string,
  logout: Function,
  role: string | null,
  updateArtistView: Function
}



export default class ArtistRoute extends React.Component<PropTypes, {} > {
//determines if someone is reaching a profile isnt theirs
//or if they clicked their own profile
  render(){
    return(
      <div>
        {this.props.userId === this.props.artistView ? 
        <YourProfile logout={this.props.logout} userId={this.props.userId}/> :  
        <FetchOther updateArtistView={this.props.updateArtistView} role={this.props.role} 
        artistView={this.props.artistView}/>}
      </div>
    )
  }

}
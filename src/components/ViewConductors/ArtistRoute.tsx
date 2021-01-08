import React from 'react';
import FetchOther from '../OtherArtist/FetchOther';
import YourProfile from '../YourProfile/YourProfile';

type PropTypes = {
  token: string | null,
  userId: string | null,
  artistView: string,
  logout: Function,
  role: string | null
}



export default class ArtistRoute extends React.Component<PropTypes, {} > {

  render(){
    return(
      <div>
        {this.props.userId == this.props.artistView ? <YourProfile logout={this.props.logout} userId={this.props.userId}/> :  <FetchOther role={this.props.role} artistView={this.props.artistView}/>}
      </div>
    )
  }

}
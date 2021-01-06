import React from 'react';
import YourProfile from '../YourProfile/YourProfile';

type PropTypes = {
  token: string | null,
  userId: string | null,
  artistView: string
}



export default class ArtistRoute extends React.Component<PropTypes, {} > {

  render(){
    return(
      <div>
        {this.props.userId == this.props.artistView ? <YourProfile userId={this.props.userId}/> : <p>{this.props.artistView}'s profile!</p> }
      </div>
    )
  }

}
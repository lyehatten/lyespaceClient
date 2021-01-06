import React from 'react';
import Auth from '../Auth/Auth';
import YourProfile from '../YourProfile/YourProfile';

type PropTypes = {
  token: string | null,
  updateToken: Function,
  updateUserId: Function,
  updateRole: Function,
  userId: string | null
}



export default class LoginRoute extends React.Component<PropTypes, {} > {

  render(){
    return(
      <div>
        {this.props.token ? <YourProfile userId={this.props.userId}/> : <Auth updateToken={this.props.updateToken} updateUserId={this.props.updateUserId} updateRole={this.props.updateRole}/>}
      </div>
    )
  }

}
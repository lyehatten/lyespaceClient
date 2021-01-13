import React from 'react';
import Auth from '../Auth/Auth';
import YourProfile from '../YourProfile/YourProfile';

type PropTypes = {
  token: string | null,
  updateToken: (newToken: string) => void,
  updateUserId: (newUserId: string) => void,
  updateRole: (newRole: string) => void,
  userId: string | null,
  logout: Function
}



export default class LoginRoute extends React.Component<PropTypes, {} > {

//can be replaced with a react router dom redirect eventually

  render(){
    return(
      <div>
        {
          this.props.token ? 
          <YourProfile logout={this.props.logout} userId={this.props.userId}/> : 
          <Auth updateToken={this.props.updateToken} updateUserId={this.props.updateUserId} 
          updateRole={this.props.updateRole}/>
        }
      </div>
    )
  }

}
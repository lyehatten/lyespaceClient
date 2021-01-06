import React from 'react';
import Auth from '../Auth/Auth';

type PropTypes = {
  token: string | null,
  updateToken: Function,
  updateUserId: Function,
  updateRole: Function
}



export default class LoginRoute extends React.Component<PropTypes, {} > {

  render(){
    return(
      <div>
        {this.props.token ? <p>home soon!</p> : <Auth updateToken={this.props.updateToken} updateUserId={this.props.updateUserId} updateRole={this.props.updateRole}/>}
      </div>
    )
  }

}
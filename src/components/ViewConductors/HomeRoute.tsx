import React from 'react';
import HomePage from '../HomePage/HomePage';
import YourProfile from '../YourProfile/YourProfile';

type PropTypes = {
  token: string | null,
  userId: string | null,
  logout: Function
};

export default class HomeRoute extends React.Component<PropTypes, {} > {
  // landing page vs your profile if you are logged in

  render() {
    return (
      <div>
        {
          this.props.token
            ? <YourProfile logout={this.props.logout} userId={this.props.userId} />
            : <HomePage />
        }
      </div>
    );
  }
}

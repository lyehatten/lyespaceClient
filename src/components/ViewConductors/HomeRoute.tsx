import React from 'react';

type PropTypes = {
  token: string | null
}



export default class HomeRoute extends React.Component<PropTypes, {} > {


  render(){
    return(
      <div>
        {this.props.token ? <p>your profile!</p> : <p>landing page!</p> }
      </div>
    )
  }

}
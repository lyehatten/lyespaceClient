import React from 'react';

type Props = {
  userId: string | null
}

type States = {

}


class YourProfile extends React.Component<Props, States> {



  componentDidMount(){
    fetch(`https://lyespace-server.herokuapp.com/user/userInfo/${this.props.userId}`)
    .then(res => res.json())
    .then(data => console.log(data))
  }


  render(){
    return(
      <div>
        <p>this is your profile</p>
      </div>
    )
  }

}

export default YourProfile;
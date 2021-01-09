import { Button, TextField } from '@material-ui/core';
import React from 'react';

type Props ={
  refresh: Function,
  userId: string | null,
}

type States ={
  post: string
}


class CreatePost extends React.Component <Props,States>{
  constructor(props: Props){
    super(props);
    this.state = {
      post: ""
    }
  }

  HandleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
        
    fetch('https://lyespace-server.herokuapp.com/posts/newPost', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        post: this.state.post
      })
    })
    .then(res => res.json())
    .then(data => this.props.refresh(this.props.userId))
    .then(data => this.setState({post: ""}))
    .catch( error => console.log(error))
  }


  render(){
    return(
      <div>
        <form onSubmit={this.HandleSubmit}>
        <TextField 
            label="Post:"
            id="post" 
            value={this.state.post} 
            variant="outlined"
            onChange={(event) => {                 
            this.setState({post: event.target.value});  
            }}
          />
          <Button variant="outlined" color="inherit" id="Submit" type="submit">Post!</Button>
        </form>
      </div>
    )
  }


}

export default CreatePost;
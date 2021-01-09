import { Button, TextField } from '@material-ui/core';
import React from 'react';

type Props = {
  post: {
    id: number,
    post: string,
    createdAt: string
  },
  refresh: Function,
  userId: string | null,
  toggleEdit: Function
}


type States = {
  post: string
}

class EditPost extends React.Component<Props, States> {
  constructor(props: Props){
    super(props);
    this.state ={
      post: this.props.post.post
    }
  }

  HandleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
        
    fetch(`https://lyespace-server.herokuapp.com/posts/edit/${this.props.post.id}`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        post: this.state.post
      })
    })
    .then(res => res.json())
    .then(data => window.location.reload())
    .catch( error => console.log(error))
  }


  render(){
    return(
      <div>
        <form onSubmit={this.HandleSubmit}>
          <div key={this.props.post.id}>
            <TextField 
              label="Edit:"
              value={this.state.post} 
              variant="outlined"
              multiline={true}
              onChange={(event) => {                 
              this.setState({post: event.target.value});  
              }}
            />
            { this.props.post.createdAt.slice(0, 10)}
            <Button type="submit">Save</Button>
        </div>
      </form>
      </div>
    )
  }
}

export default EditPost;
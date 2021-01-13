import { Button, TextField } from '@material-ui/core';
import React from 'react';
import { withStyles, WithStyles } from "@material-ui/core/styles";
import Box from '@material-ui/core/Box';

const styles = {
  posts: {
    padding: '20px',
    margin: '10px',
    borderRadius: '2px'
  },
  field: {
    width: '100%'
  }
}


interface Props extends WithStyles<typeof styles> {
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
    const {classes} = this.props
    return(
      <Box bgcolor="background.paper" 
      borderColor='text.secondary' border={1} 
      className={classes.posts}>
        <form onSubmit={this.HandleSubmit}>
        <TextField className={classes.field}
            label="New Post:"
            id="post" 
            value={this.state.post} 
            multiline={true}
            variant="outlined"
            onChange={(event) => {                 
            this.setState({post: event.target.value});  
            }}
          />
          <br/>
          <br/>
          <Button variant="outlined" color="inherit" 
          id="Submit" type="submit">
            Post!
          </Button>
        </form>
      </Box>
    )
  }


}

export default withStyles(styles)(CreatePost);
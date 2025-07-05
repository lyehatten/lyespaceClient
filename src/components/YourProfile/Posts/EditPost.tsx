import { Button, TextField } from '@material-ui/core';
import React from 'react';
import { withStyles, WithStyles } from "@material-ui/core/styles";

const styles = {
  field: {
    width: '100%'
  }
}

interface Props extends WithStyles<typeof styles>  {
  post: {
    id: string,
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
        
    fetch(`${process.env.REACT_APP_API_URL}/posts/edit/${this.props.post.id}`, {
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
    const {classes} = this.props
    return(
      <div>
        <form onSubmit={this.HandleSubmit}>
          <div key={this.props.post.id}>
            <TextField className={classes.field}
              label="Edit Post:"
              value={this.state.post} 
              variant="outlined"
              multiline={true}
              onChange={(event) => {                 
              this.setState({post: event.target.value});  
              }}
            />
            <br/>
            <Button color="primary" type="submit">Save</Button>
            <br/>
            <br/>
            { this.props.post.createdAt.slice(0, 10)}
        </div>
      </form>
      </div>
    )
  }
}

export default withStyles(styles)(EditPost);
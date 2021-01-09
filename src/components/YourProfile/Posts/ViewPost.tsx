import { Button } from '@material-ui/core'
import React from 'react'
import EditPost from './EditPost'

type Props = {
  post: {
    id: number,
    post: string,
    createdAt: string
  },
  refresh: Function,
  userId: string | null,
}

type States = {
  editToggle: boolean
}

class ViewPost extends React.Component <Props, States> {
  constructor(props: Props){
    super(props)
    this.state ={
      editToggle: false
    }
  }

  toggleEdit() {
    this.setState({
      editToggle: !this.state.editToggle
    })
  }

  deletePost = (postId: number) =>{
    fetch(`https://lyespace-server.herokuapp.com/posts/delete/${postId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${localStorage.getItem('token')}`
      }
  })
  .then(res => res.json())
  .then(data => window.location.reload())
  .catch(error => console.log(error))
  }

  render(){
  return(
    <div>
      {this.state.editToggle ? <EditPost userId={this.props.userId} toggleEdit={this.toggleEdit} post={this.props.post} refresh={this.props.refresh} /> :
      <div key={this.props.post.id}>
        <p>{this.props.post.post}</p>
        { this.props.post.createdAt.slice(0, 10)}
      </div>
      }

    <Button onClick={() => this.toggleEdit()}>{this.state.editToggle ? <p>Cancel</p>: <p>Edit</p>}</Button>
    <Button onClick={() => this.deletePost(this.props.post.id)}>Delete</Button>
    </div>
  )}
}

export default ViewPost
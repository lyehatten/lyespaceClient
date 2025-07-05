import React from 'react';
import CreatePost from './CreatePost';
import ViewPosts from './ViewPosts';
import Typography from '@material-ui/core/Typography';
import { withStyles, WithStyles } from "@material-ui/core/styles";

const styles = {
  root: {
    margin: '10px'
  }
}

interface Props extends WithStyles<typeof styles>  {
  posts: Array<{id: string, post: string, createdAt: string}> | null,
  userId: string | null,
  refresh: Function
}


class Posts extends React.Component <Props>{

  render(){
    const {classes} = this.props
    return(
      <div className={classes.root}>
        <br/>
        <Typography variant="h3">Posts: </Typography>
        <CreatePost refresh={this.props.refresh} userId={this.props.userId}/>
        <br/>
        <br/>
        {this.props.posts ? <ViewPosts posts={this.props.posts} userId={this.props.userId} refresh={this.props.refresh}/> : undefined}
      </div>
    )
  }


}

export default withStyles(styles)(Posts);
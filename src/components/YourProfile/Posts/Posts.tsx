import React from 'react';
import CreatePost from './CreatePost';
import ViewPosts from './ViewPosts';

type Props = {
  posts: Array<{id: number, post: string, createdAt: string}> | null,
  userId: string | null,
  refresh: Function
}


class Posts extends React.Component <Props>{

  render(){
    return(
      <div>
        <CreatePost refresh={this.props.refresh} userId={this.props.userId}/>
        <br/>
        <br/>
        {this.props.posts ? <ViewPosts posts={this.props.posts} userId={this.props.userId} refresh={this.props.refresh}/> : undefined}
      </div>
    )
  }


}

export default Posts;
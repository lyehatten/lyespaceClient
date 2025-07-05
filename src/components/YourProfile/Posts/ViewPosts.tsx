import React from 'react'
import ViewPost from './ViewPost';

type Props = {
  posts: Array<{id: string, post: string, createdAt: string}>,
  refresh: Function,
  userId: string | null,
}

class ViewPosts extends React.Component <Props>{

  render(){
  return(
    <div>
      {
        this.props.posts.map(post => {
          return(
          <ViewPost post={post} refresh={this.props.refresh} userId={this.props.userId}/>
        )})
      }
    </div>
  )}

}

export default ViewPosts;
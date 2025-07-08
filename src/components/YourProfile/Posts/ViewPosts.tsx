import React from 'react';
import ViewPost from './ViewPost';
import { Post } from '../../../types';

type Props = {
  posts: Array<Post>,
  refresh: Function,
  userId: string | null,
  getUserInfo: () => void
};

function ViewPosts(props: Props) {
  const {
    posts, refresh, userId, getUserInfo,
  } = props;
  return (
    <div>
      {
        posts.map((post) => (
          <ViewPost
            key={post.id}
            getUserInfo={getUserInfo}
            post={post}
            refresh={refresh}
            userId={userId}
          />
        ))
      }
    </div>
  );
}

export default ViewPosts;

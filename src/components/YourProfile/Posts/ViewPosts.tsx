import React from 'react';
import ViewPost from './ViewPost';
import { Post } from '../../../types';

type Props = {
  posts: Array<Post>,
  refresh: Function,
  userId: string | null,
};

function ViewPosts(props: Props) {
  const { posts, refresh, userId } = props;
  return (
    <div>
      {
        posts.map((post) => (
          <ViewPost key={post.id} post={post} refresh={refresh} userId={userId} />
        ))
      }
    </div>
  );
}

export default ViewPosts;

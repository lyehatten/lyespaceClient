import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import CreatePost from './CreatePost';
import ViewPosts from './ViewPosts';
import { Post } from '../../../types';

const styles = {
  root: {
    margin: '10px',
  },
};

interface Props extends WithStyles<typeof styles> {
  posts: Array<Post> | null,
  userId: string | null,
  refresh: Function,
  getUserInfo: () => void
}

function Posts(props: Props) {
  const {
    classes, refresh, userId, posts, getUserInfo,
  } = props;
  return (
    <div className={classes.root}>
      <br />
      <Typography variant="h3">Posts: </Typography>
      <CreatePost refresh={refresh} getUserInfo={getUserInfo} userId={userId} />
      <br />
      <br />
      {posts && (
      <ViewPosts
        posts={posts}
        userId={userId}
        getUserInfo={getUserInfo}
        refresh={refresh}
      />
      )}
    </div>
  );
}

export default withStyles(styles)(Posts);

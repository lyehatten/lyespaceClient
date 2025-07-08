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
  refresh: Function
}

function Posts(props: Props) {
  const {
    classes, refresh, userId, posts,
  } = props;
  return (
    <div className={classes.root}>
      <br />
      <Typography variant="h3">Posts: </Typography>
      <CreatePost refresh={refresh} userId={userId} />
      <br />
      <br />
      {posts && <ViewPosts posts={posts} userId={userId} refresh={refresh} />}
    </div>
  );
}

export default withStyles(styles)(Posts);

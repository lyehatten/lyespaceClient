import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import EditPost from './EditPost';
import { Post } from '../../../types';

const styles = {
  posts: {
    padding: '20px',
    margin: '10px',
    borderRadius: '2px',
  },
};

interface Props extends WithStyles<typeof styles> {
  post: Post,
  refresh: Function,
  userId: string | null,
}

function ViewPost(props: Props) {
  const {
    classes, post, refresh, userId,
  } = props;

  const [editToggle, setEditToggle] = useState<boolean>(false);

  async function deletePost(postId: string) {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/posts/delete/${postId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${localStorage.getItem('token')}`,
        },
      });
      const data = await res.json();
      if (data) {
        refresh(userId);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Box
      bgcolor="background.paper"
      borderColor="text.secondary"
      border={1}
      className={classes.posts}
    >
      {
          editToggle
            ? (
              <EditPost
                userId={userId}
                post={post}
                editToggle={() => setEditToggle(!editToggle)}
                refresh={refresh}
              />
            ) : (
              <div key={post.id}>
                <Typography variant="body1" paragraph>
                  {post.post}
                </Typography>
                <Typography variant="overline">
                  DATE:
                  {' '}
                  { post.createdAt.slice(0, 10)}
                </Typography>
              </div>
            )
}
      <Button
        color="secondary"
        variant="contained"
        onClick={() => setEditToggle(!editToggle)}
      >
        {
        editToggle
          ? <>Cancel</> : <>Edit</>
}
      </Button>
      <Button
        color="primary"
        onClick={() => deletePost(post.id)}
      >
        Delete
      </Button>
    </Box>
  );
}

export default withStyles(styles)(ViewPost);

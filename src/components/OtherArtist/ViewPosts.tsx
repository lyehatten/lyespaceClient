import React from 'react';
import { Button } from '@material-ui/core';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Post } from '../../types';

const styles = {
  root: {
    margin: '10px',
  },
  posts: {
    padding: '20px',
    margin: '10px',
    borderRadius: '2px',
  },
  admn: {
    marginLeft: '10px',
  },
};

interface Props extends WithStyles<typeof styles> {
  posts: Post[] | null,
  admin: string | null,
  adminRemovePost: (id: string) => void
}

function ViewPosts(props: Props) {
  const {
    classes, posts, admin, adminRemovePost,
  } = props;
  return (
    <div className={classes.root}>
      <br />
      <Typography variant="h3">Posts: </Typography>
      {
        posts && posts.map((post) => (
          <Box
            bgcolor="background.paper"
            borderColor="text.secondary"
            border={1}
            key={post.id}
            className={classes.posts}
          >
            <Typography variant="body1" paragraph>
              {post.post}
            </Typography>
            <Typography variant="overline">
              DATE:
              {' '}
              { post.createdAt.slice(0, 10)}
            </Typography>
            {
              admin === 'bandmate' || admin === 'big boss' ? (
                <Button
                  color="primary"
                  className={classes.admn}
                  onClick={() => adminRemovePost(post.id)}
                >
                  Remove Post
                </Button>
              ) : undefined
            }
          </Box>
        ))
      }
    </div>
  );
}

export default withStyles(styles)(ViewPosts);

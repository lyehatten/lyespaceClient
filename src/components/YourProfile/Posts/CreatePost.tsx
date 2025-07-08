import React, { useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

const styles = {
  posts: {
    padding: '20px',
    margin: '10px',
    borderRadius: '2px',
  },
  field: {
    width: '100%',
  },
};

interface Props extends WithStyles<typeof styles> {
  refresh: Function,
  userId: string | null,
  getUserInfo: () => void
}

function CreatePost(props: Props) {
  const {
    classes, refresh, userId, getUserInfo,
  } = props;
  const [post, setPost] = useState<string>('');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/posts/newPost`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          post,
        }),
      });
      const data = await res.json();
      if (data) {
        refresh(userId);
        setPost('');
        getUserInfo();
      }
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <Box
      bgcolor="background.paper"
      borderColor="text.secondary"
      border={1}
      className={classes.posts}
    >
      <form onSubmit={handleSubmit}>
        <TextField
          className={classes.field}
          label="New Post:"
          id="post"
          value={post}
          multiline
          variant="outlined"
          onChange={(event) => setPost(event.target.value)}
        />
        <br />
        <br />
        <Button
          variant="outlined"
          color="inherit"
          id="Submit"
          type="submit"
        >
          Post!
        </Button>
      </form>
    </Box>
  );
}

export default withStyles(styles)(CreatePost);

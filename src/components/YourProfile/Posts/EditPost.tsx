import { Button, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import { Post } from '../../../types';

const styles = {
  field: {
    width: '100%',
  },
};

interface Props extends WithStyles<typeof styles> {
  post: Post,
  refresh: Function,
  userId: string | null,
  editToggle: Function
}

function EditPost(props: Props) {
  const {
    post, refresh, userId, classes, editToggle,
  } = props;

  const [newPost, setNewPost] = useState<string>(post.post);
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/posts/edit/${post.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          post: newPost,
        }),
      });
      const data = await res.json();
      if (data) {
        refresh(userId);
        editToggle();
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div key={post.id}>
          <TextField
            className={classes.field}
            label="Edit Post:"
            value={newPost}
            variant="outlined"
            multiline
            onChange={(event) => setNewPost(event.target.value)}
          />
          <br />
          <Button color="primary" type="submit">Save</Button>
          <br />
          <br />
          { post.createdAt.slice(0, 10)}
        </div>
      </form>
    </div>
  );
}

export default withStyles(styles)(EditPost);
